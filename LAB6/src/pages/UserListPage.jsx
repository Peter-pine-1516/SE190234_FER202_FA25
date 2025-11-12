import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Container, Card } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers, selectAllUsers, selectUsersState } from '../features/users/usersSlice';

const UserListPage = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectAllUsers);
    const { isLoading, error } = useAppSelector(selectUsersState);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [sortBy, setSortBy] = useState('id_asc');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const roles = useMemo(() => {
        const uniqueRoles = [...new Set(users.map(u => u.role))];
        return uniqueRoles.sort();
    }, [users]);

    const statuses = useMemo(() => {
        const uniqueStatuses = [...new Set(users.map(u => u.status))];
        return uniqueStatuses.sort();
    }, [users]);

    const filteredUsers = useMemo(() => {
        let filtered = [...users];

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (user) =>
                    user.username.toLowerCase().includes(searchLower) ||
                    user.fullName.toLowerCase().includes(searchLower)
            );
        }

        // Apply role filter
        if (selectedRole) {
            filtered = filtered.filter((user) => user.role === selectedRole);
        }

        // Apply status filter
        if (selectedStatus) {
            filtered = filtered.filter((user) => user.status === selectedStatus);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'id_asc':
                    return parseInt(a.id) - parseInt(b.id);
                case 'id_desc':
                    return parseInt(b.id) - parseInt(a.id);
                case 'username_asc':
                    return a.username.localeCompare(b.username);
                case 'username_desc':
                    return b.username.localeCompare(a.username);
                case 'fullName_asc':
                    return a.fullName.localeCompare(b.fullName);
                case 'fullName_desc':
                    return b.fullName.localeCompare(a.fullName);
                case 'role_asc':
                    return a.role.localeCompare(b.role);
                case 'role_desc':
                    return b.role.localeCompare(a.role);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [users, searchTerm, selectedRole, selectedStatus, sortBy]);

    if (isLoading) {
        return (
            <>
                <NavigationHeader />
                <Container className="mt-4">
                    <div className="text-center py-5">
                        <p>Đang tải...</p>
                    </div>
                </Container>
            </>
        );
    }

    return (
        <>
            <NavigationHeader />
            <Container>
                {error && (
                    <Alert variant="danger" className="mt-3">
                        {error}
                    </Alert>
                )}
                <h2 className="mb-4">User Management</h2>
                
                <UserFilter
                    searchTerm={searchTerm}
                    selectedRole={selectedRole}
                    selectedStatus={selectedStatus}
                    sortBy={sortBy}
                    roles={roles}
                    statuses={statuses}
                    onSearchChange={setSearchTerm}
                    onRoleChange={setSelectedRole}
                    onStatusChange={setSelectedStatus}
                    onSortChange={setSortBy}
                />
                
                <Card className="mb-4 shadow-sm">
                    <Card.Header as="h5">
                        User List
                    </Card.Header>
                    <Card.Body>
                        <UserTable filteredUsers={filteredUsers} />
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default UserListPage;


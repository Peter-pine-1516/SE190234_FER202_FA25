import React, { useState, useMemo } from 'react';

import { Container, Card, Button } from 'react-bootstrap';

import NavigationHeader from '../components/NavigationHeader';

import FilterBar from '../components/FilterBar';

import PaymentTable from '../components/PaymentTable';

import { useNavigate } from 'react-router-dom';
import { usePayment } from '../contexts/PaymentContext';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { payments, isLoading } = usePayment();
    
    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [sortBy, setSortBy] = useState('date_desc');

    // Get unique semesters and courses from payments
    const semesters = useMemo(() => {
        const uniqueSemesters = [...new Set(payments.map(p => p.semester))];
        return uniqueSemesters.sort();
    }, [payments]);

    const courses = useMemo(() => {
        const uniqueCourses = [...new Set(payments.map(p => p.courseName))];
        return uniqueCourses.sort();
    }, [payments]);

    // Filter and sort payments
    const filteredPayments = useMemo(() => {
        let filtered = [...payments];

        // Apply search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (payment) =>
                    payment.semester.toLowerCase().includes(searchLower) ||
                    payment.courseName.toLowerCase().includes(searchLower)
            );
        }

        // Apply semester filter
        if (selectedSemester) {
            filtered = filtered.filter((payment) => payment.semester === selectedSemester);
        }

        // Apply course filter
        if (selectedCourse) {
            filtered = filtered.filter((payment) => payment.courseName === selectedCourse);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'course_asc':
                    return a.courseName.localeCompare(b.courseName);
                case 'course_desc':
                    return b.courseName.localeCompare(a.courseName);
                case 'date_asc':
                    return new Date(a.date) - new Date(b.date);
                case 'date_desc':
                    return new Date(b.date) - new Date(a.date);
                case 'amount_asc':
                    return a.amount - b.amount;
                case 'amount_desc':
                    return b.amount - a.amount;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [payments, searchTerm, selectedSemester, selectedCourse, sortBy]);

    const handleAddPayment = () => {
        navigate('/payments/add');
    };

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
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />
            {/* 2. Main Dashboard Content (Grid và Card) */}
            <Container>
                <FilterBar
                    searchTerm={searchTerm}
                    selectedSemester={selectedSemester}
                    selectedCourse={selectedCourse}
                    sortBy={sortBy}
                    semesters={semesters}
                    courses={courses}
                    onSearchChange={setSearchTerm}
                    onSemesterChange={setSelectedSemester}
                    onCourseChange={setSelectedCourse}
                    onSortChange={setSortBy}
                />
                <Card className="mb-4 shadow-sm">
                    <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                        <span>Payment Management</span>
                        <Button variant="primary" onClick={handleAddPayment}>
                            + Add Payment
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <PaymentTable filteredPayments={filteredPayments} />
                    </Card.Body>
                </Card>
            </Container>    
        </>
    );
};

export default DashboardPage;

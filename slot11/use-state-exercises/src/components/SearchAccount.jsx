//SearchAccount component using useState to search accounts by username
import React, { useState } from 'react';
import './SearchAccount.css';

function SearchAccount() {
    //Dữ liệu mẫu accounts
    const [accounts] = useState([
        { id: 1, username: 'john_doe', password: 'password123', avatar: '/DE180020.jpg' },
        { id: 2, username: 'jane_smith', password: 'securepass', avatar: '/DE180814.jpg' },
        { id: 3, username: 'mike_wilson', password: 'mypassword', avatar: '/DE190234.jpg' },
        { id: 4, username: 'sarah_jones', password: 'strongpass', avatar: '/DE190491.jpg' }
    ]);

    //State cho search term
    const [searchTerm, setSearchTerm] = useState('');
    
    //State cho filtered accounts
    const [filteredAccounts, setFilteredAccounts] = useState(accounts);

    //Hàm xử lý tìm kiếm
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        
        if (term === '') {
            setFilteredAccounts(accounts);
        } else {
            const filtered = accounts.filter(account => 
                account.username.toLowerCase().includes(term)
            );
            setFilteredAccounts(filtered);
        }
    };


    return (
        <div className="search-container">
            <h2 className="component-title">Tìm Kiếm Account</h2>
            
            {/* Input tìm kiếm */}
            <input
                type="text"
                placeholder="Nhập username để tìm kiếm..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />

            {/* Hiển thị kết quả */}
            {filteredAccounts.length === 0 ? (
                <div className="no-results">
                    Không tìm thấy kết quả
                </div>
            ) : (
                <div>
                    <h3 className="results-header">Danh sách Accounts ({filteredAccounts.length})</h3>
                    {filteredAccounts.map(account => (
                        <div key={account.id} className="account-card">
                            <img 
                                src={account.avatar} 
                                alt={`Avatar of ${account.username}`}
                                className="account-avatar"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <div className="account-info">
                                <div className="account-username">
                                    @{account.username}
                                </div>
                                <div className="account-password">
                                    Password: {account.password}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchAccount;

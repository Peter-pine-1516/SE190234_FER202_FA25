import React, { useState, useMemo } from "react";
import { Container, Card, Button } from "react-bootstrap";
import NavigationHeader from "../components/NavigationHeader";
import FilterBar from "../components/FilterBar";
import { useNavigate } from "react-router-dom";
import { useExpenses } from "../contexts/ExpenseContext";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { expensess, isLoading } = useExpenses();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedname, setSelectedname] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [sortBy, setSortBy] = useState("date_desc");

  // Get unique names and courses from expensess
  const names = useMemo(() => {
    const uniquenames = [...new Set(expensess.map((p) => p.name))];
    return uniquenames.sort();
  }, [expensess]);

  const courses = useMemo(() => {
    const uniqueCourses = [...new Set(expensess.map((p) => p.courseName))];
    return uniqueCourses.sort();
  }, [expensess]);

  // Filter and sort expensess
  const filteredexpensess = useMemo(() => {
    let filtered = [...expensess];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (expenses) =>
          expenses.name.toLowerCase().includes(searchLower) ||
          expenses.courseName.toLowerCase().includes(searchLower)
      );
    }

    // Apply name filter
    if (selectedname) {
      filtered = filtered.filter((expenses) => expenses.name === selectedname);
    }

    // Apply course filter
    if (selectedCourse) {
      filtered = filtered.filter(
        (expenses) => expenses.courseName === selectedCourse
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "course_asc":
          return a.courseName.localeCompare(b.courseName);
        case "course_desc":
          return b.courseName.localeCompare(a.courseName);
        case "date_asc":
          return new Date(a.date) - new Date(b.date);
        case "date_desc":
          return new Date(b.date) - new Date(a.date);
        case "amount_asc":
          return a.amount - b.amount;
        case "amount_desc":
          return b.amount - a.amount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [expensess, searchTerm, selectedname, selectedCourse, sortBy]);

  const handleAddexpenses = () => {
    navigate("/expensess/add");
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
          selectedname={selectedname}
          selectedCourse={selectedCourse}
          sortBy={sortBy}
          names={names}
          courses={courses}
          onSearchChange={setSearchTerm}
          onnameChange={setSelectedname}
          onCourseChange={setSelectedCourse}
          onSortChange={setSortBy}
        />
        <Card className="mb-4 shadow-sm">
          <Card.Header
            as="h5"
            className="d-flex justify-content-between align-items-center"
          >
            <span>expenses Management</span>
            <Button variant="primary" onClick={handleAddexpenses}>
              + Add expenses
            </Button>
          </Card.Header>
          <Card.Body>
            <expensesTable filteredexpensess={filteredexpensess} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default DashboardPage;

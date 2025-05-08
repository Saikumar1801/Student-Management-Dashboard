// src/contexts/StudentContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
    getStudents as fetchStudentsAPI,
    addStudent as addStudentAPI,
    getStudentById as getStudentByIdAPI,
    updateStudent as updateStudentAPI,
    deleteStudent as deleteStudentAPI,
    getAvailableCourses as getAvailableCoursesAPI
} from '../services/studentService';

const StudentContext = createContext();

export const useStudents = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ course: '', searchTerm: '' });
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchStudentsAPI(filters);
            let sortedStudents = [...response.data];
            if (sortConfig.key) {
                sortedStudents.sort((a, b) => {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                });
            }
            setStudents(sortedStudents);
        } catch (err) {
            setError(err.message || 'Failed to fetch students');
            setStudents([]);
        } finally {
            setLoading(false);
        }
    }, [filters, sortConfig]);

    const fetchCourses = useCallback(async () => {
        try {
            const response = await getAvailableCoursesAPI();
            setCourses(response.data);
        } catch (err) {
            console.error("Failed to fetch courses:", err);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
        fetchCourses();
    }, [fetchStudents, fetchCourses]);

    const addStudent = async (studentData) => {
        // setLoading(true); // Handled by individual page/component
        setError(null);
        try {
            const response = await addStudentAPI(studentData);
            await fetchStudents(); // Refetch to update list with sorting/filters
            await fetchCourses(); // Courses might have changed
            return response.data;
        } catch (err) {
            setError(err.message || 'Failed to add student');
            throw err;
        }
        // finally { setLoading(false); }
    };

    const updateStudentData = async (id, studentData) => {
        // setLoading(true);
        setError(null);
        try {
            const response = await updateStudentAPI(id, studentData);
            await fetchStudents();
            await fetchCourses();
            return response.data;
        } catch (err) {
            setError(err.message || 'Failed to update student');
            throw err;
        }
        // finally { setLoading(false); }
    };

    const removeStudent = async (id) => {
        // setLoading(true);
        setError(null);
        try {
            await deleteStudentAPI(id);
            await fetchStudents();
            await fetchCourses();
        } catch (err) {
            setError(err.message || 'Failed to delete student');
            throw err;
        }
        // finally { setLoading(false); }
    };


    const getStudentById = async (id) => {
        // setLoading(true); // Handled by individual page
        setError(null);
        try {
            const response = await getStudentByIdAPI(id);
            return response.data;
        } catch (err) {
            setError(err.message || `Failed to fetch student ${id}`);
            throw err;
        }
        // finally { setLoading(false); }
    };

    const applyFilter = (filterKey, value) => {
        setFilters(prev => ({ ...prev, [filterKey]: value }));
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };


    const value = {
        students,
        loading,
        error,
        courses,
        filters,
        sortConfig,
        fetchStudents, // Expose if manual refetch is needed
        addStudent,
        updateStudentData,
        removeStudent,
        getStudentById,
        applyFilter,
        requestSort,
    };

    return (
        <StudentContext.Provider value={value}>
            {children}
        </StudentContext.Provider>
    );
};
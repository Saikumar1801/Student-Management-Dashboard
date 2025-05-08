// src/services/studentService.js
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const API_DELAY = 500; // Reduced delay for snappier UI
const LOCAL_STORAGE_KEY = 'mockStudents';

const initialMockStudents = [
  { id: '1', name: 'Alice Wonderland', email: 'alice.wonder@example.com', course: 'Computer Science', year: 3, photoUrl: 'https://i.pravatar.cc/150?img=1', notes: 'Excellent in algorithms.' },
  { id: '2', name: 'Bob The Builder', email: 'bob.builder@example.com', course: 'Engineering', year: 2, photoUrl: 'https://i.pravatar.cc/150?img=2', notes: 'Great at practicals.' },
  { id: '3', name: 'Charlie Chaplin', email: 'charlie.chap@example.com', course: 'Arts', year: 4, photoUrl: 'https://i.pravatar.cc/150?img=3', notes: 'Creative and expressive.' },
  { id: '4', name: 'Diana Prince', email: 'diana.prince@example.com', course: 'Computer Science', year: 2, photoUrl: 'https://i.pravatar.cc/150?img=4', notes: 'Focuses on cybersecurity.' },
  { id: '5', name: 'Edward Scissorhands', email: 'edward.sc@example.com', course: 'Arts', year: 1, photoUrl: 'https://i.pravatar.cc/150?img=5', notes: 'Talented but shy.' },
  { id: '6', name: 'Fiona Gallagher', email: 'fiona.gallagher@example.com', course: 'Business', year: 3, photoUrl: 'https://i.pravatar.cc/150?img=6', notes: 'Strong leadership skills.' },
];

const getStoredStudents = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : initialMockStudents;
};

let mockStudents = getStoredStudents();
if (!localStorage.getItem(LOCAL_STORAGE_KEY)) { // Initialize if not present
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialMockStudents));
}


const saveStudentsToStorage = (students) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
};

export const getStudents = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let students = [...getStoredStudents()];
      if (filters.course) {
        students = students.filter(student =>
          student.course.toLowerCase() === filters.course.toLowerCase()
        );
      }
      if (filters.searchTerm) {
        students = students.filter(student =>
          student.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }
      resolve({ data: students });
    }, API_DELAY);
  });
};

export const getStudentById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const student = getStoredStudents().find(s => s.id === id);
      if (student) {
        resolve({ data: student });
      } else {
        reject(new Error('Student not found'));
      }
    }, API_DELAY / 2);
  });
};

export const addStudent = (studentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentStudents = getStoredStudents();
      const newStudent = {
        id: uuidv4(),
        ...studentData,
        photoUrl: studentData.photoUrl || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
        notes: studentData.notes || ''
      };
      const updatedStudents = [...currentStudents, newStudent];
      saveStudentsToStorage(updatedStudents);
      mockStudents = updatedStudents; // update in-memory cache
      resolve({ data: newStudent });
    }, API_DELAY);
  });
};

export const updateStudent = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let currentStudents = getStoredStudents();
      const index = currentStudents.findIndex(s => s.id === id);
      if (index !== -1) {
        currentStudents[index] = { ...currentStudents[index], ...updatedData };
        saveStudentsToStorage(currentStudents);
        mockStudents = currentStudents;
        resolve({ data: currentStudents[index] });
      } else {
        reject(new Error('Student not found for update'));
      }
    }, API_DELAY);
  });
};

export const deleteStudent = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let currentStudents = getStoredStudents();
      const updatedStudents = currentStudents.filter(s => s.id !== id);
      saveStudentsToStorage(updatedStudents);
      mockStudents = updatedStudents;
      resolve({ message: 'Student deleted successfully' });
    }, API_DELAY);
  });
};

export const getAvailableCourses = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const courses = [...new Set(getStoredStudents().map(s => s.course))];
            resolve({ data: courses.sort() });
        }, API_DELAY / 3);
    });
};
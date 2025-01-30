export type FirebaseTable =
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";

export type FirebaseAction = "create" | "update" | "delete";

export interface FirebaseProps<T = any> {
    table: FirebaseTable;
    type: FirebaseAction;
    data?: Partial<T>;
    id?: string;
}

export interface Teacher {
    id: string;
    name: string;
    email: string;
    subjects: string[];
}

export interface Student {
    id: string;
    name: string;
    email: string;
    class: string;
    parents: string[];
}

export interface Parent {
    id: string;
    name: string;
    email?: string;
    students: string[];
    phone: string;
    address: string;
}

export interface Subject {
    id: string;
    name: string;
    teacherId: string;
}

export interface Class {
    id: string;
    name: string;
    teacherId: string;
    studentIds: string[];
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    date: string;
    class: string;
}

export interface Lesson {
    id: string;
    subjectId: string;
    classId: string;
    date: string;
    content: string;
}

export interface Exam {
    id: string;
    subjectId: string;
    classId: string;
    date: string;
    content: string;
}

export interface Assignment {
    id: string;
    subjectId: string;
    classId: string;
    dueDate: string;
    content: string;
}

export interface Result {
    id: string;
    studentId: string;
    examId: string;
    marks: number;
}

export interface Attendance {
    id: string;
    studentId: string;
    date: string;
    status: "present" | "absent";
}

export interface Event {
    id: string;
    title: string;
    date: string;
    description: string;
}
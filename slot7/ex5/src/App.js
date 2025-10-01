import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import Header from "./component/Header";
import HeroBanner from "./component/HeroBanner";
import Breadcrumbs from "./component/Breadcrumbs";
import StudentsGrid from "./component/StudentsGrid";
import Footer from "./component/Footer";

import { students } from "./data/students";

export default function App() {
  return (
    <>
      <Header />
      <HeroBanner src="/FPT_STUDENT.jpeg" alt="FPT Students" />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Students" }]} />
      <main className="container py-5">
        <h2 className="text-center mb-4">Students Detail</h2>
        <StudentsGrid students={students} />
      </main>
      <Footer />
    </>
  );
}

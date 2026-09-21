import React from "react";
import { PackageProvider } from "./context/PackageContext.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import SellerFlow from "./components/SellerFlow.jsx";
import ForWhom from "./components/ForWhom.jsx";
import SkillsDashboard from "./components/SkillsDashboard.jsx";
import Outcomes from "./components/Outcomes.jsx";
import Program from "./components/Program.jsx";
import CardLab from "./components/CardLab.jsx";
import Practice from "./components/Practice.jsx";
import Author from "./components/Author.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Packages from "./components/Packages.jsx";
import PackageQuiz from "./components/PackageQuiz.jsx";
import FAQ from "./components/FAQ.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import Footer from "./components/Footer.jsx";
import ApplicationForm from "./components/ApplicationForm.jsx";
import AdminReviews from "./components/AdminReviews.jsx";

export default function App() {
  // Простой роутинг без библиотек: /admin/reviews открывает закрытую
  // страницу модерации отзывов вместо основного сайта.
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
    return <AdminReviews />;
  }

  return (
    <PackageProvider>
      <div className="bg-decor" aria-hidden="true">
        <span className="glow glow-red" />
        <span className="glow glow-graphite" />
        <span className="glow glow-red-2" />
      </div>

      <Header />
      <main>
        <Hero />
        <SellerFlow />
        <ForWhom />
        <SkillsDashboard />
        <Outcomes />
        <Program />
        <CardLab />
        <Practice />
        <Author />
        <Testimonials />
        <Packages />
        <PackageQuiz />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <ApplicationForm />
    </PackageProvider>
  );
}

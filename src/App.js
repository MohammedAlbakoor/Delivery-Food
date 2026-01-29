import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ===== Layout Components ===== */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { PageTransition } from "./components/PageTransition";

/* ===== Home Sections ===== */
import Hero from "./components/Hero";
import Food from "./components/Food";
import Category from "./components/Category";
import HeadlineCards from "./components/HeadlineCards";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import LimitedOffer from "./components/LimitedOffer";

/* ===== Pages ===== */
import FoodDetails from "./pages/FoodDetails";
import Favorites from "./pages/Favorites";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Restaurants from "./pages/Restaurants";
import Notifications from "./pages/Notifications";
import FoodPreferences from "./pages/FoodPreferences";
import AdvancedSearch from "./pages/AdvancedSearch";
import Support from "./pages/Support";

/* ===== Routes ===== */
import ProtectedRoute from "./routes/ProtectedRoute";

/* ===== Context ===== */
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

/* ===== UI Enhancements ===== */
import MiniCartPopup from "./components/MiniCartPopup";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          {/* Global UI */}
          <ScrollProgress />
          <WhatsAppButton />
          <Navbar />
          <MiniCartPopup />

          <Routes>
            {/* ===== Home ===== */}
            <Route
              path="/"
              element={
                <>
                  <LimitedOffer />

                  <section id="home">
                    <Hero />
                  </section>

                  <section id="menu">
                    <Food />
                  </section>

                  <section id="categories">
                    <Category />
                  </section>

                  <section id="best">
                    <HeadlineCards />
                  </section>

                  <WhyChooseUs />

                  <section>
                    <Testimonials />
                  </section>

                  <CTASection />
                  <Footer />
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <Profile />
                  </PageTransition>
                </ProtectedRoute>
              }
            />

            {/* ===== Order History (Protected) ===== */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <OrderHistory />
                  </PageTransition>
                </ProtectedRoute>
              }
            />

          

            {/* ===== About ===== */}
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />

            {/* ===== FAQ ===== */}
            <Route
              path="/faq"
              element={
                <PageTransition>
                  <FAQ />
                </PageTransition>
              }
            />

            {/* ===== Contact ===== */}
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/restaurants"
              element={
                <PageTransition>
                  <Restaurants />
                </PageTransition>
              }
            />
            
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <Notifications />
                  </PageTransition>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/preferences"
              element={
                <ProtectedRoute>
                  <PageTransition>
                    <FoodPreferences />
                  </PageTransition>
                </ProtectedRoute>
              }
            />

            <Route
              path="/search"
              element={
                <PageTransition>
                  <AdvancedSearch />
                </PageTransition>
              }
            />
            <Route
              path="/support"
              element={
                <PageTransition>
                  <Support />
                </PageTransition>
              }
            />

            {/* ===== Food Details ===== */}
            <Route path="/food/:id" element={<FoodDetails />} />

            {/* ===== Auth ===== */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ===== Cart (Protected) ===== */}
            <Route
              path="/card"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />

            {/* ===== Favorites (Protected) ===== */}
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
          </Routes>

          <ScrollToTopButton />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

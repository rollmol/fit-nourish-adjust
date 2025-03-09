
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Récupération de la clé publishable de Clerk
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_cHJpbWUtc25haWwtOTAuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  console.error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      afterSignInUrl="/profile"
      afterSignUpUrl="/profile"
      signInUrl="/auth?tab=signin"
      signUpUrl="/auth?tab=signup"
      navigate={(to) => window.location.href = to}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);

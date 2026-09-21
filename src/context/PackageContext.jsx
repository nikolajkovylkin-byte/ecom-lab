import React, { createContext, useContext, useState, useCallback } from "react";
import { packages } from "../data.js";

const PackageContext = createContext(null);

export function PackageProvider({ children }) {
  const [selectedId, setSelectedId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const selectPackage = useCallback((id, openForm = true) => {
    setSelectedId(id);
    if (openForm) setFormOpen(true);
  }, []);

  const closeForm = useCallback(() => setFormOpen(false), []);

  const selected = packages.find((p) => p.id === selectedId) || null;

  return (
    <PackageContext.Provider
      value={{ selected, selectedId, selectPackage, formOpen, setFormOpen, closeForm }}
    >
      {children}
    </PackageContext.Provider>
  );
}

export function usePackage() {
  const ctx = useContext(PackageContext);
  if (!ctx) throw new Error("usePackage must be used within PackageProvider");
  return ctx;
}

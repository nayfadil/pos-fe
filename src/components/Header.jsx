import React, { useContext } from 'react';
import { ShoppingBag, LogOut, LayoutDashboard, Store } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export function Header({ activeTab, setActiveTab }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className=
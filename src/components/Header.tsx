
import React from 'react';
import { Button } from "@/components/ui/button";
import { Github } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-border bg-card py-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-bodyModel-main to-bodyModel-dark flex items-center justify-center">
            <span className="text-white font-bold text-sm">3D</span>
          </div>
          <h1 className="text-xl font-bold text-bodyModel-dark">BodyScribe</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Github size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

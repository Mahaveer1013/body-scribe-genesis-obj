
import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-4 mt-auto">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          BodyScribe - Create accurate 3D body models from measurements
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

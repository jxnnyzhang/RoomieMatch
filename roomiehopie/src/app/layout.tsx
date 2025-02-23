// src/app/layout.tsx
import "./globals.css";
import { ProfileProvider } from "./context/ProfileContext"; // adjust path if necessary

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}

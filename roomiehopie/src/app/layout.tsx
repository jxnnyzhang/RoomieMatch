// src/app/layout.tsx
import "./globals.css";
import { ProfileProvider } from "./context/ProfileContext";
import AuthProvider from "./components/SessionProvider";
import { UserProvider } from "./context/UserContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProfileProvider>
          <AuthProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </AuthProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}

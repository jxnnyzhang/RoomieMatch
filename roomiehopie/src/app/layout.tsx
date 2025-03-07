// src/app/layout.tsx
import "./globals.css";
import { ProfileProvider } from "./context/ProfileContext"; // adjust path if necessary
import AuthProvider from "./components/SessionProvider"; // Import the wrapper



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  

    <html lang="en">
      <body>
         <ProfileProvider>
           <AuthProvider> {children} </AuthProvider>
         </ProfileProvider>
      </body>
   </html>
   

  );
}

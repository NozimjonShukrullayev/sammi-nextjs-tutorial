import { Footer, Navbar } from "@/components";
import { LayoutProps } from "@/layout/layout.props";
import { Box } from "@mui/material";
import { JSX } from "react";

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Navbar />
      <Box minHeight={"90vh"}>
        {children}
      </Box>
      <Footer />
    </>
  )
}

export default Layout;
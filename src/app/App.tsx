import { Container, Theme } from "@radix-ui/themes";
import { RouterProvider } from "@tanstack/react-router";

import "@radix-ui/themes/styles.css";

import { router } from "@app/router";

function App() {
  return (
    <Theme
      appearance="inherit"
      accentColor="tomato"
      grayColor="mauve"
      radius="large"
      scaling="100%"
      panelBackground="solid"
      hasBackground
    >
      <Container size="3" py="6">
        <RouterProvider router={router} />
      </Container>
    </Theme>
  );
}

export default App;

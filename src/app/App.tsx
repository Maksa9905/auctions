import { Heading, Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";

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
      <Heading as="h1">Hello World</Heading>
    </Theme>
  )
}

export default App

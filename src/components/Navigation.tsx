import {
  Inline,
  Image,
  Link,
  Split,
  Menu,
  Button,
  Text,
} from '@marigold/components';
import React from 'react';

import { ThemeNames, useActiveTheme } from '../../src/provider';

export const Navigation = () => {
  const { current, themes, setActiveTheme: setCurrentTheme } = useActiveTheme();

  return (
    <nav>
      <Inline space="small">
        <Image src="images/sw.png" alt="Star Wars Logo" height={60} />
        <Link href="#">Home</Link>
        <Link href="https://swapi.py4e.com/">About</Link>
        <Split />
        <Menu.Trigger>
          <Button variant="menu" size="small">
            Choose Menu
          </Button>
          <Menu onSelect={current => setCurrentTheme(current as ThemeNames)}>
            {Object.keys(themes).map(name => (
              <Menu.Item key={name}>{name}</Menu.Item>
            ))}
          </Menu>
        </Menu.Trigger>
        <Text>{current}</Text>
      </Inline>
    </nav>
  );
};

import React from 'react';
import { Inline, Image, Link, Split, Menu, Button } from '@marigold/components';
import image from '../../public/images/sw.png';

import { ThemeNames, useActiveTheme } from '../../src/provider';

export const Navigation = () => {
  const { current, themes, setActiveTheme: setCurrentTheme } = useActiveTheme();

  return (
    <nav>
      <Inline space="small">
        <Image src={image} alt="Star Wars Logo" height={60} />
        <Link href="#">Home</Link>
        <Link href="https://swapi.py4e.com/">About</Link>
        <Split />
        <Menu.Trigger>
          <Button variant="menu" size="small">
            Theme: {current.replace(/theme/i, '')}
          </Button>
          <Menu onSelect={current => setCurrentTheme(current as ThemeNames)}>
            {Object.keys(themes).map(name => (
              <Menu.Item key={name}>{name.replace(/theme/i, '')}</Menu.Item>
            ))}
          </Menu>
        </Menu.Trigger>
      </Inline>
    </nav>
  );
};

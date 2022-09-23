import { useState } from 'react';
import { Inline, Image, Link, Split, Menu, Button } from '@marigold/components';

const Navigation = () => {
  const [selected, setSelected] = useState<string | number>('');

  return (
    <nav>
      <Inline space="small">
        <Image src="/sw.png" alt="Star Wars Logo" height={60} />
        <Link href="#">Home</Link>
        <Link href="https://swapi.dev">About</Link>

        <Split />

        <Menu.Trigger>
          <Button variant="menu" size="small">
            Choose Menu
          </Button>
          <Menu onSelect={setSelected}>
            <Menu.Item key="burger">🍔 Burger</Menu.Item>
            <Menu.Item key="pizza">🍕 Pizza</Menu.Item>
            <Menu.Item key="salad">🥗 Salad</Menu.Item>
            <Menu.Item key="fries">🍟 Fries</Menu.Item>
          </Menu>
        </Menu.Trigger>
      </Inline>
    </nav>
  );
};

export default Navigation;

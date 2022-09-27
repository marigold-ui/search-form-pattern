import {
  Inline,
  Image,
  Link,
  Split,
  Menu,
  Button,
  Text,
} from '@marigold/components';
import { useThemeSwitch } from './ThemeMenuContext';

const Navigation = () => {
  const { current, themes, setTheme } = useThemeSwitch();

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
          <Menu onSelect={current => setTheme(current)}>
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

export default Navigation;

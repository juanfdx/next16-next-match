import { ButtonTest } from '@/components/ButtonTest';
import ThemeToggle from '@/components/ThemeToggle';


//"prc" page component snippet
export default function HomePage() {
  return (
    <div>
      <h1 className='text-3xl font-semibold'>Home Page</h1>
      <ButtonTest />
      <ThemeToggle />
    </div>
  );
}
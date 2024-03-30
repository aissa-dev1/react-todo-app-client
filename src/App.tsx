import Container from "./components/Container";
import Navbar from "./components/Navbar";
import TaskCreationSection from "./components/TaskCreationSection";
import TasksSection from "./components/TasksSection";

const App = () => {
  return (
    <main>
      <Navbar />

      <Container>
        <TaskCreationSection />
        <TasksSection />
      </Container>
    </main>
  );
};

export default App;

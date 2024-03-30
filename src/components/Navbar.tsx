import Container from "./Container";

const Navbar = () => {
  return (
    <nav className="py-6 text-black bg-white">
      <Container className="flex flex-col gap-2">
        <h3 className="text-xl">Todo application</h3>

        <p className="text-sm font-semibold">
          Fast & full stack web application | create, read, update, delete
        </p>
      </Container>
    </nav>
  );
};

export default Navbar;

import { OrgTree } from "../../widgets/display/OrgTree";

const organization = {
  id: "founder",
  name: "Arun",
  role: "Founder & CEO",
  children: [
    {
      id: "cofounder",
      name: "John",
      role: "Co-Founder",
    },
    {
      id: "cto",
      name: "Alex",
      role: "Chief Technology Officer",
      children: [
        {
          id: "frontend",
          name: "Sarah",
          role: "Frontend Lead",
        },
        {
          id: "backend",
          name: "David",
          role: "Backend Lead",
        },
      ],
    },
    {
      id: "cmo",
      name: "Emma",
      role: "Marketing Head",
    },
  ],
};

export function TreesSection() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Leadership Team
        </h2>

        <OrgTree node={organization} />
      </div>
    </section>
  );
}

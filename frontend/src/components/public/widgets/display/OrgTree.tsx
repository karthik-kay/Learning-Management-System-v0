import * as React from "react";
import { cn } from "@/lib/utils";

export type OrgNode = {
  id: string;
  name: string;
  role: string;
  image?: string;
  children?: OrgNode[];
};

type OrgTreeProps = {
  node: OrgNode;
  className?: string;
};

export function OrgTree({ node, className }: OrgTreeProps) {
  return (
    <div className={cn("w-full overflow-x-auto py-10", className)}>
      <div className="inline-flex min-w-full justify-center px-6">
        <OrgNodeView node={node} />
      </div>
    </div>
  );
}

function OrgNodeView({ node }: { node: OrgNode }) {
  const hasChildren = !!node.children?.length;

  return (
    <div className="flex flex-col items-center">
      <OrgCard node={node} />

      {hasChildren && (
        <div className="flex flex-col items-center">
          <div className="h-8 w-px bg-public-neutral-300" />

          <div className="relative flex items-start justify-center gap-8 pt-8">
            <div className="absolute left-1/2 top-0 h-px w-[calc(100%-13rem)] -translate-x-1/2 bg-public-neutral-300" />

            {node.children!.map((child) => (
              <div
                key={child.id}
                className="relative flex flex-col items-center"
              >
                <div className="absolute -top-8 left-1/2 h-8 w-px -translate-x-1/2 bg-public-neutral-300" />
                <OrgNodeView node={child} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OrgCard({ node }: { node: OrgNode }) {
  return (
    <article className="group relative w-60 rounded-2xl border border-public-neutral-200 bg-white p-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-public-orange-300 hover:shadow-lg">
      <div className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-public-orange-500" />

      {node.image ? (
        <img
          src={node.image}
          alt={node.name}
          className="mx-auto mb-4 size-16 rounded-full border-4 border-public-orange-100 object-cover"
        />
      ) : (
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-public-blue-50 text-lg font-bold text-public-blue-800">
          {getInitials(node.name)}
        </div>
      )}

      <h3 className="text-base font-bold text-public-blue-900">{node.name}</h3>

      <p className="mt-1 text-sm font-medium text-public-orange-600">
        {node.role}
      </p>
    </article>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

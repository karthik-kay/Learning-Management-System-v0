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
    <div className={cn("flex justify-center overflow-x-auto py-6", className)}>
      <OrgNodeView node={node} />
    </div>
  );
}

function OrgNodeView({ node }: { node: OrgNode }) {
  const hasChildren = Boolean(node.children?.length);

  return (
    <div className="flex flex-col items-center">
      <OrgCard node={node} />

      {hasChildren && (
        <>
          <div className="h-6 w-px bg-public-neutral-300" />

          <div className="flex items-start justify-center gap-6">
            {node.children!.map((child) => (
              <div
                key={child.id}
                className="relative flex flex-col items-center"
              >
                <div className="absolute -top-0 h-px w-full bg-public-neutral-300" />
                <div className="h-6 w-px bg-public-neutral-300" />
                <OrgNodeView node={child} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function OrgCard({ node }: { node: OrgNode }) {
  return (
    <div className="w-52 rounded-xl border border-public-neutral-200 bg-white p-4 text-center shadow-sm">
      {node.image && (
        <img
          src={node.image}
          alt={node.name}
          className="mx-auto mb-3 size-14 rounded-full object-cover"
        />
      )}

      <h3 className="text-sm font-semibold text-public-blue-900">
        {node.name}
      </h3>

      <p className="mt-1 text-xs text-public-neutral-600">{node.role}</p>
    </div>
  );
}

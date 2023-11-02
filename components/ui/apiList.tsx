"use client";

import { useOrigin } from "@/hooks/useOrigin";
import { useParams, usePathname } from "next/navigation";
import { ApiAlert } from "./apiAlert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export default function ApiList(props: ApiListProps) {
  const { entityName, entityIdName } = props;
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeid}`;

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}}/{${entityIdName}}`}
      />
    </>
  );
}

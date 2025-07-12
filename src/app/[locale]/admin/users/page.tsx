import { DataTableUser } from "@/components/admin/users/usersTable";

import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { User } from "@prisma/client";

import React from "react";

const page = async () => {
  const users = await db.user.findMany();
  const locale = await getCurrentLocale();
  const translate = await getTrans(locale);

  return (
    <section className="w-full">
      <div>
        <h2 className="text-primary text-center text-3xl font-[700]">
          {translate.Admin.User.title}
        </h2>
      </div>
      <div className="mx-5">
        <DataTableUser
          data={users as User[]}
          locale={locale}
          translate={translate}
        />
      </div>
    </section>
  );
};

export default page;

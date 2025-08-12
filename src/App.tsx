import { useState } from "react";
import { FilterPanel } from "./components/FilterPanel";
import { UserCard } from "./components/UserCard";
import { ExpensiveChart } from "./components/ExpensiveChart";
import { UserForm } from "./components/UserForm";
import { users as initialUsers } from "./data/users";

export const App = () => {
  const [userList, setUserList] = useState([...initialUsers]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc" | "default">("default");

  const addUser = (name: string, email: string, role: Role) => {
    setUserList((prev) => [
      {
        id: Math.floor(Math.random() * 1000000),
        name,
        email,
        role,
      },
      ...prev,
    ]);
  };

  const onSendMessage = (msg: string, name: string) => {
    console.log(`Message for ${name}: ${msg}`);
  };

  const filteredUsers = userList
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "default"
        ? 0
        : sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div className="max-w-7xl mx-auto space-y-4 pt-16 h-full bg-white px-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex flex-col xl:flex-row gap-y-4 gap-x-4">
        <div className="w-full flex flex-col gap-y-4">
          <UserForm addUser={addUser} />
          <div className="flex-1 flex flex-col gap-y-6">
            <FilterPanel
              search={search}
              onSearch={setSearch}
              sort={sort}
              onSort={setSort}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={{
                  ...user,
                  role: user.role as Role,
                }}
                onSendMessage={onSendMessage}
              />
            ))}
          </div>
        </div>
        <ExpensiveChart />
      </div>
    </div>
  );
};

const employees = [
  { name: 'Grace M.', department: 'Operations', role: 'Manager', limit: 'TSh 100,000 / month', status: 'Active' },
  { name: 'Joshua K.', department: 'Clinical', role: 'Employee', limit: 'TSh 80,000 / month', status: 'Approved' },
  { name: 'Mariam R.', department: 'Sales', role: 'Employee', limit: 'TSh 60,000 / month', status: 'Pending invite' },
];

export default function CorporateEmployeesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Employee management</p>
          <h1 className="mt-2 text-4xl font-black text-ink">People and policy</h1>
        </div>
        <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">Invite employee</button>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Employee</th>
              <th className="px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Department</th>
              <th className="px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Role</th>
              <th className="px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Limits</th>
              <th className="px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {employees.map((employee) => (
              <tr key={employee.name}>
                <td className="px-5 py-4 font-semibold text-ink">{employee.name}</td>
                <td className="px-5 py-4 text-slate-600">{employee.department}</td>
                <td className="px-5 py-4 text-slate-600">{employee.role}</td>
                <td className="px-5 py-4 text-slate-600">{employee.limit}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

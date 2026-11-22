'use client';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { CHART_COLORS } from '@/lib/constants';

type Point = { name: string; value: number };

const Box = ({ title, children, empty }: { title: string; children: React.ReactNode; empty: boolean }) => (
  <div className="card p-5">
    <h3 className="mb-4 text-base font-bold text-ink-900">{title}</h3>
    <div className="h-64">{empty ? <div className="grid h-full place-items-center text-sm text-slate-400">No data yet</div> : children}</div>
  </div>
);

export function DonutChart({ title, data }: { title: string; data: Point[] }) {
  return (
    <Box title={title} empty={!data?.length}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
            {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
          </Pie>
          <Tooltip /><Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}

export function SimpleBar({ title, data, money = false, color = '#0f766e' }: { title: string; data: Point[]; money?: boolean; color?: string }) {
  return (
    <Box title={title} empty={!data?.length}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: -10, right: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} interval={0} angle={data.length > 5 ? -20 : 0} textAnchor={data.length > 5 ? 'end' : 'middle'} height={data.length > 5 ? 60 : 30} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} tickFormatter={(v) => (money ? `$${v}` : v)} />
          <Tooltip formatter={(v: number) => (money ? `$${v}` : v)} cursor={{ fill: '#f1f5f9' }} />
          <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} maxBarSize={44} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

import React, { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function Todolist() {
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState("");

	const addTask = (e) => {
		e.preventDefault();
		if (!title.trim()) return;
		setTasks((t) => [{ id: Date.now(), title: title.trim(), done: false }, ...t]);
		setTitle("");
	};

	const toggle = (id) => setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
	const clearDone = () => setTasks((t) => t.filter((x) => !x.done));

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#F6F4DD] p-6">
			<div className="w-full max-w-3xl">
				<h2 className="text-2xl font-bold mb-4">Todolist</h2>

				<Card title="Tambah Tugas" subtitle="Catat tugas singkatmu di sini">
					<form onSubmit={addTask} className="flex gap-3">
						<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Apa yang ingin kamu lakukan?" className="input-field" />
						<Button type="submit">Tambah</Button>
					</form>
				</Card>

				<div className="mt-6 bg-white rounded-2xl shadow p-4">
					<div className="flex justify-between items-center mb-3">
						<div className="text-sm text-gray-600">Daftar Tugas ({tasks.length})</div>
						<button onClick={clearDone} className="text-sm text-primary">Hapus Selesai</button>
					</div>

					<ul className="flex flex-col gap-2">
						{tasks.map((t) => (
							<li key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
								<div className="flex items-center gap-3">
									<input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
									<div className={`${t.done ? "line-through text-gray-400" : "text-gray-800"}`}>{t.title}</div>
								</div>
								<div className="text-xs text-gray-500">—</div>
							</li>
						))}
						{tasks.length === 0 && <li className="text-sm text-gray-500">Belum ada tugas. Tambahkan tugas di atas.</li>}
					</ul>
				</div>
			</div>
		</div>
	);
}

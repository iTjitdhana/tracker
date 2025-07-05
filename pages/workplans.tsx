import React, { useEffect, useState } from 'react';
import { format, parse, parseISO } from 'date-fns';
import { th } from 'date-fns/locale/th';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

// สมมติว่ามี API /api/workplans สำหรับ GET/POST/PUT

interface Operator {
  id: number;
  name: string;
}

interface WorkPlan {
  id: number;
  job_name: string;
  operators: Operator[];
  start_time: string; // HH:mm
  end_time: string;   // HH:mm
  date: string;       // yyyy-MM-dd
  production_date?: string; // yyyy-MM-dd (จาก API)
  operator_names?: string;  // string (จาก API)
}

const WorkPlansPage = () => {
  const [workPlans, setWorkPlans] = useState<WorkPlan[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [form, setForm] = useState({
    job_name: '',
    operatorIds: [] as number[],
    start_time: '',
    end_time: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // โหลด operator list (mock หรือ fetch จริง)
  useEffect(() => {
    // TODO: fetch จริงจาก /api/operators
    setOperators([
      { id: 1, name: 'สมชาย' },
      { id: 2, name: 'สมหญิง' },
      { id: 3, name: 'ประยุทธ์' },
      { id: 4, name: 'ประวิตร' },
      { id: 5, name: 'อนุทิน' },
    ]);
  }, []);

  // โหลด workplans ตามวันที่
  useEffect(() => {
    setError(null);
    fetch(`/api/workplans?date=${selectedDate}`)
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(data => setWorkPlans(data))
      .catch(err => setError('โหลดข้อมูลไม่สำเร็จ: ' + err.message));
  }, [selectedDate]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'operatorIds') {
      const options = (e.target as HTMLSelectElement).options;
      const selected: number[] = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) selected.push(Number(options[i].value));
      }
      setForm(f => ({ ...f, operatorIds: selected.slice(0, 4) }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.job_name || form.operatorIds.length === 0 || !form.start_time || !form.end_time) {
      setError('กรุณากรอกข้อมูลให้ครบ');
      return;
    }
    setError(null);
    const body = {
      ...form,
      date: selectedDate,
      id: editingId,
    };
    const method = editingId ? 'PUT' : 'POST';
    const url = '/api/workplans' + (editingId ? `/${editingId}` : '');
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setForm({ job_name: '', operatorIds: [], start_time: '', end_time: '' });
      setEditingId(null);
      setSelectedDate(selectedDate); // reload
    } else {
      setError('บันทึกข้อมูลไม่สำเร็จ');
    }
  };

  const handleEdit = (wp: WorkPlan) => {
    setEditingId(wp.id);
    setForm({
      job_name: wp.job_name,
      operatorIds: wp.operators.map(o => o.id),
      start_time: wp.start_time,
      end_time: wp.end_time,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Work Plan</h1>
      <div className="mb-4 flex gap-4 items-center">
        <label>เลือกวันที่:</label>
        <Input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="border-blue-300"
        />
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-6 flex flex-col gap-3">
        <div>
          <label>ชื่องาน:</label>
          <Input name="job_name" value={form.job_name} onChange={handleFormChange} className="border-blue-300" />
        </div>
        <div>
          <label>ผู้ปฏิบัติงาน (เลือกได้สูงสุด 4 คน):</label>
          <select
            name="operatorIds"
            multiple
            value={form.operatorIds.map(String)}
            onChange={handleFormChange}
            className="border-blue-300 w-full"
            size={4}
          >
            {operators.map(op => (
              <option key={op.id} value={op.id}>{op.name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-4">
          <div>
            <label>เวลาเริ่ม (24 ชม.):</label>
            <Input
              name="start_time"
              type="text"
              pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
              placeholder="HH:mm"
              maxLength={5}
              value={form.start_time}
              onChange={handleFormChange}
              className="border-blue-300"
            />
          </div>
          <div>
            <label>เวลาจบ (24 ชม.):</label>
            <Input
              name="end_time"
              type="text"
              pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
              placeholder="HH:mm"
              maxLength={5}
              value={form.end_time}
              onChange={handleFormChange}
              className="border-blue-300"
            />
          </div>
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <Button type="submit" className="bg-blue-700 text-white">{editingId ? 'บันทึกการแก้ไข' : 'เพิ่ม Work Plan'}</Button>
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-100 text-blue-900">
            <th className="p-2">วันที่</th>
            <th className="p-2">ชื่องาน</th>
            <th className="p-2">ผู้ปฏิบัติงาน</th>
            <th className="p-2">เวลาเริ่ม</th>
            <th className="p-2">เวลาจบ</th>
            <th className="p-2">แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {workPlans.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-gray-400 py-8">ไม่พบข้อมูล</td>
            </tr>
          ) : (
            workPlans.map(wp => (
              <tr key={wp.id} className="border-b hover:bg-blue-50">
                <td className="p-2 text-blue-900">
                  {wp.production_date
                    ? format(parseISO(wp.production_date), 'dd/MM/yyyy', { locale: th })
                    : '-'}
                </td>
                <td className="p-2 text-blue-900">{wp.job_name}</td>
                <td className="p-2 text-blue-900">{wp.operator_names || '-'}</td>
                <td className="p-2 text-blue-900">{wp.start_time}</td>
                <td className="p-2 text-blue-900">{wp.end_time}</td>
                <td className="p-2">
                  <Button type="button" onClick={() => handleEdit(wp)} className="bg-blue-200 text-blue-900">แก้ไข</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkPlansPage; 
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Play, Pause, CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"

interface ProductionItem {
  id: number
  name: string
  category: string
  startTime: string
  endTime: string
  duration: string
  actualDuration?: string
  status: "completed" | "in-progress" | "pending" | "cancelled"
  timeRange: string
}

const productionData: ProductionItem[] = [
  {
    id: 1,
    name: "ปลากระพง 640 - 700 กรัม(ตัว)(Repack)",
    category: "โอเล่",
    startTime: "14:00",
    endTime: "-",
    duration: "0:15",
    status: "pending",
    timeRange: "14:00-14:15",
  },
  {
    id: 2,
    name: "ปลาหมึกกล้วยไข่ (Repack)",
    category: "โอเล่",
    startTime: "14:15",
    endTime: "-",
    duration: "0:15",
    status: "pending",
    timeRange: "14:15-14:30",
  },
  {
    id: 3,
    name: "เนื้อปลากระพงขาวแล่หนัง 300-500g/ชิ้น (Repack)",
    category: "โอเล่",
    startTime: "14:30",
    endTime: "-",
    duration: "0:15",
    status: "pending",
    timeRange: "14:30-14:45",
  },
  {
    id: 4,
    name: "อกไก่หมัก",
    category: "เอ, สาม",
    startTime: "09:26",
    endTime: "00:12",
    duration: "2:00",
    status: "in-progress",
    timeRange: "09:00-11:00",
  },
  {
    id: 5,
    name: "พริกแกงส้ม สูตร 2",
    category: "จรัญ",
    startTime: "09:00",
    endTime: "-",
    duration: "5:00",
    status: "pending",
    timeRange: "09:00-14:00",
  },
  {
    id: 6,
    name: "แป้งไก่มะนาว",
    category: "อาร์ม",
    startTime: "14:00",
    endTime: "-",
    duration: "2:00",
    status: "pending",
    timeRange: "14:00-16:00",
  },
  {
    id: 7,
    name: "Ankimo Pate 250g/pc",
    category: "พี่ตุ่น, แมน",
    startTime: "09:00",
    endTime: "-",
    duration: "7:00",
    status: "pending",
    timeRange: "09:00-16:00",
  },
  {
    id: 8,
    name: "ซอสหมี่กะเฉด",
    category: "ป้าน้อย",
    startTime: "09:00",
    endTime: "-",
    duration: "0:30",
    status: "pending",
    timeRange: "09:00-09:30",
  },
  {
    id: 9,
    name: "ผัก",
    category: "ป้าน้อย, เอ, สาม",
    startTime: "11:00",
    endTime: "-",
    duration: "5:00",
    status: "pending",
    timeRange: "11:00-16:00",
  },
  {
    id: 10,
    name: "น้ำจิ้มเมี่ยงคำ",
    category: "จรัญ",
    startTime: "09:00",
    endTime: "-",
    duration: "3:30",
    status: "pending",
    timeRange: "09:00-12:30",
  },
  {
    id: 11,
    name: "น้ำจิ้มเมี่ยงคำ",
    category: "จรัญ",
    startTime: "09:00",
    endTime: "-",
    duration: "3:30",
    status: "pending",
    timeRange: "09:00-12:30",
  },
  {
    id: 12,
    name: "แป้งกอดนิ่มข้าวโพด",
    category: "พีท",
    startTime: "13:30",
    endTime: "-",
    duration: "1:30",
    status: "pending",
    timeRange: "13:30-15:00",
  },
  {
    id: 13,
    name: "ส่วนผัด - Ankimo",
    category: "RD",
    startTime: "09:00",
    endTime: "00:20",
    duration: "6:30",
    status: "pending",
    timeRange: "09:00-15:30",
  },
  {
    id: 14,
    name: "น้ำพริกปลาร้า",
    category: "จรัญ",
    startTime: "10:00",
    endTime: "-",
    duration: "2:30",
    status: "pending",
    timeRange: "10:00-12:30",
  },
]

const statusConfig = {
  completed: { label: "เสร็จสิ้น", color: "bg-gradient-to-br from-green-700 via-green-800 to-emerald-900", count: 0 },
  "in-progress": {
    label: "กำลังดำเนินการ",
    color: "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600",
    count: 1,
  },
  pending: { label: "รอดำเนินการ", color: "bg-gradient-to-br from-slate-600 via-gray-600 to-zinc-700", count: 13 },
  cancelled: { label: "งานที่ถูกยกเลิก", color: "bg-gradient-to-br from-red-600 via-rose-600 to-pink-700", count: 0 },
}

export default function ProductionDashboard() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">เสร็จสิ้น</Badge>
      case "in-progress":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">กำลังดำเนินการ</Badge>
      case "pending":
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">รอดำเนินการ</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">ยกเลิก</Badge>
      default:
        return <Badge variant="secondary">ไม่ทราบสถานะ</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-white" />
      case "in-progress":
        return <Play className="w-6 h-6 text-white" />
      case "pending":
        return <Pause className="w-6 h-6 text-white" />
      case "cancelled":
        return <XCircle className="w-6 h-6 text-white" />
      default:
        return <Clock className="w-6 h-6 text-white" />
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // แบ่งข้อมูลเป็น 2 ตาราง ตารางละ 7 งาน
  const leftTableData = productionData.slice(0, 7)
  const rightTableData = productionData.slice(7, 14)

  const ProductionTable = ({ data, title }: { data: ProductionItem[]; title: string }) => (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-[10px] overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-800">
              <tr>
                <th className="px-4 py-4 text-left text-lg font-bold text-white w-20">ที่</th>
                <th className="px-4 py-4 text-left text-lg font-bold text-white">งานที่ผลิต</th>
                <th className="px-4 py-4 text-left text-lg font-bold text-white w-28">เวลาเริ่ม</th>
                <th className="px-4 py-4 text-left text-lg font-bold text-white w-28">เวลาผลิต</th>
                <th className="px-4 py-4 text-left text-lg font-bold text-white w-24">ระยะเวลา</th>
                <th className="px-4 py-4 text-left text-lg font-bold text-white w-36">สถานะการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              {data.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gradient-to-r hover:from-emerald-25 hover:to-green-25 transition-all duration-200 ${
                    selectedStatus && item.status !== selectedStatus ? "opacity-50" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-800 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {item.id}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-slate-900 text-base mb-1">{item.name}</p>
                      <p className="text-sm text-emerald-600 font-medium">{item.category}</p>
                      <p className="text-sm text-slate-500 mt-1">{item.timeRange}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span className="font-mono text-slate-900 text-base">{item.startTime}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-slate-600 text-base">
                      {item.endTime === "-" ? "-" : item.endTime}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className={`px-3 py-2 rounded-full text-sm font-medium inline-block ${
                        item.status === "in-progress"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {item.duration}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      {getStatusBadge(item.status)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-sky-100 to-white font-noto-thai">
      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white shadow-2xl border-b border-gray-200">
          <div className="w-full px-6 py-6">
            <div className="flex items-center justify-between">
              {/* Left Side - JDN Logo */}
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <Image src="/images/jdn-logo.png" alt="JDN Logo" width={60} height={40} className="object-contain" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-slate-800">ตารางงานการผลิตสินค้าครัวกลาง</h1>
                  <p className="text-slate-600 text-lg">Production Tracking System</p>
                </div>
              </div>

              {/* Right Side - Brand Logos and Date/Time */}
              <div className="flex items-center gap-6">
                {/* Brand Logos */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <Image
                    src="/images/shabu101-logo.jpg"
                    alt="Shabu 101 Logo"
                    width={60}
                    height={40}
                    className="object-contain"
                  />
                  <Image
                    src="/images/banana-leaf-logo.png"
                    alt="Banana Leaf Logo"
                    width={60}
                    height={40}
                    className="object-contain"
                  />
                  <Image
                    src="/images/meating-house-logo.png"
                    alt="The Meating House Logo"
                    width={60}
                    height={40}
                    className="object-contain"
                  />
                </div>

                {/* Date and Time */}
                <div className="text-right">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <Calendar className="w-5 h-5" />
                    <input
                      type="date"
                      value={selectedDate.toISOString().split("T")[0]}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                      className="text-lg bg-transparent border-none outline-none cursor-pointer hover:text-slate-800 transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-slate-800">
                    <Clock className="w-5 h-5" />
                    <span className="text-2xl font-mono">{formatTime(new Date())}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container with Background */}
        <div className="w-full px-3 py-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
              {Object.entries(statusConfig).map(([key, config]) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 border-0 shadow-lg relative overflow-hidden ${
                    selectedStatus === key ? "ring-2 ring-emerald-500" : ""
                  } ${key === "completed" || key === "in-progress" || key === "pending" || key === "cancelled" ? "" : config.color}`}
                  onClick={() => setSelectedStatus(selectedStatus === key ? null : key)}
                  style={
                    key === "completed"
                      ? {
                          backgroundImage: `url('/images/completed-dish-background.jpg')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                          filter: "contrast(1.1) brightness(1.0) saturate(0.8)",
                        }
                      : key === "in-progress"
                        ? {
                            backgroundImage: `url('/images/clean-kitchen-background.jpg')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            filter: "contrast(1.2) brightness(1.1) saturate(1.1)",
                          }
                        : key === "pending"
                          ? {
                              backgroundImage: `url('/images/storage-room-background.jpg')`,
                              backgroundSize: "cover",
                              backgroundPosition: "center center",
                              filter: "contrast(1.2) brightness(1.1) saturate(1.1) grayscale(30%)",
                            }
                          : key === "cancelled"
                            ? {
                                backgroundImage: `url('/images/quality-control-background.jpg')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center center",
                                filter: "contrast(1.2) brightness(1.1) saturate(1.1)",
                              }
                            : {}
                  }
                >
                  {(key === "completed" || key === "in-progress" || key === "pending" || key === "cancelled") && (
                    <div
                      className={`absolute inset-0 ${
                        key === "completed"
                          ? "bg-gradient-to-br from-green-700/60 via-green-800/50 to-emerald-900/60"
                          : key === "in-progress"
                            ? "bg-gradient-to-br from-orange-500/40 via-amber-500/30 to-yellow-600/40"
                            : key === "pending"
                              ? "bg-gradient-to-br from-slate-600/40 via-gray-600/30 to-zinc-700/40"
                              : "bg-gradient-to-br from-red-600/25 via-rose-600/20 to-pink-700/25"
                      }`}
                    ></div>
                  )}
                  <CardContent className="py-5 px-4 relative z-10 min-h-[110px]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {config.label}
                        </p>
                        <p className="text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {config.count}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                        <div className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {key === "completed" && <CheckCircle className="w-6 h-6 text-white" />}
                          {key === "in-progress" && <Play className="w-6 h-6 text-white" />}
                          {key === "pending" && <Pause className="w-6 h-6 text-white" />}
                          {key === "cancelled" && <XCircle className="w-6 h-6 text-white" />}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Production Tables - 2 Tables Side by Side */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-6">
              {/* Left Table */}
              <ProductionTable data={leftTableData} title="รายการงานการผลิต (งานที่ 1-7)" />

              {/* Right Table */}
              <ProductionTable data={rightTableData} title="รายการงานการผลิต (งานที่ 8-14)" />
            </div>

            {/* Summary Footer */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              <Card className="bg-gradient-to-r from-green-700 to-emerald-800 text-white border-0 shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm">งานทั้งหมด</p>
                      <p className="text-2xl font-bold">14</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-emerald-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-100 text-sm">เวลาเฉลี่ย</p>
                      <p className="text-2xl font-bold">2:15</p>
                    </div>
                    <Clock className="w-8 h-8 text-amber-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

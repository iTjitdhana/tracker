"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Save, RefreshCw, Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DataActionButtons() {
  const [saveState, setSaveState] = useState<"idle" | "saving" | "success" | "error">("idle")
  const [syncState, setSyncState] = useState<"idle" | "syncing" | "success" | "error">("idle")

  const handleSave = async () => {
    setSaveState("saving")

    // จำลองการบันทึกข้อมูล
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSaveState("success")
      setTimeout(() => setSaveState("idle"), 2000)
    } catch (error) {
      setSaveState("error")
      setTimeout(() => setSaveState("idle"), 3000)
    }
  }

  const handleSync = async () => {
    setSyncState("syncing")

    // จำลองการซิงค์ข้อมูล
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setSyncState("success")
      setTimeout(() => setSyncState("idle"), 2000)
    } catch (error) {
      setSyncState("error")
      setTimeout(() => setSyncState("idle"), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 font-noto-thai">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800 font-noto-thai">ปุ่มจัดการข้อมูล</h1>
          <p className="text-slate-600 text-lg font-noto-thai font-medium">
            ปุ่มบันทึกและซิงค์ข้อมูลที่ออกแบบมาเพื่อประสบการณ์ผู้ใช้ที่ดี
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">ปุ่มหลัก</h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={saveState === "saving"}
              className={cn(
                "relative px-6 py-4 text-base font-semibold rounded-xl transition-all duration-300 min-w-[140px] font-noto-thai",
                saveState === "idle" &&
                  "bg-emerald-600 hover:bg-emerald-700 hover:scale-105 shadow-lg hover:shadow-emerald-200",
                saveState === "saving" && "bg-emerald-500 cursor-not-allowed",
                saveState === "success" && "bg-green-600",
                saveState === "error" && "bg-red-600",
              )}
            >
              <div className="flex items-center gap-1">
                {saveState === "idle" && <Save className="w-4 h-4" />}
                {saveState === "saving" && <RefreshCw className="w-4 h-4 animate-spin" />}
                {saveState === "success" && <Check className="w-4 h-4" />}
                {saveState === "error" && <AlertCircle className="w-4 h-4" />}

                <span>
                  {saveState === "idle" && "บันทึกข้อมูล"}
                  {saveState === "saving" && "กำลังบันทึก..."}
                  {saveState === "success" && "บันทึกสำเร็จ!"}
                  {saveState === "error" && "เกิดข้อผิดพลาด"}
                </span>
              </div>
            </Button>

            {/* Sync Button */}
            <Button
              onClick={handleSync}
              disabled={syncState === "syncing"}
              className={cn(
                "relative px-6 py-4 text-base font-semibold rounded-xl transition-all duration-300 min-w-[112px] font-noto-thai",
                syncState === "idle" && "bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg hover:shadow-blue-200",
                syncState === "syncing" && "bg-blue-500 cursor-not-allowed",
                syncState === "success" && "bg-green-600",
                syncState === "error" && "bg-red-600",
              )}
            >
              <div className="flex items-center gap-3">
                {syncState === "idle" && <RefreshCw className="w-4 h-4" />}
                {syncState === "syncing" && <RefreshCw className="w-4 h-4 animate-spin" />}
                {syncState === "success" && <Check className="w-4 h-4" />}
                {syncState === "error" && <AlertCircle className="w-4 h-4" />}

                <span>
                  {syncState === "idle" && "ซิงค์ข้อมูล"}
                  {syncState === "syncing" && "กำลังซิงค์..."}
                  {syncState === "success" && "ซิงค์สำเร็จ!"}
                  {syncState === "error" && "เกิดข้อผิดพลาด"}
                </span>
              </div>
            </Button>
          </div>
        </div>

        {/* Alternative Styles */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">รูปแบบอื่นๆ</h2>

          {/* Outline Style */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-700">แบบ Outline</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="px-4 py-2 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600 transition-all duration-200 bg-transparent"
              >
                <Save className="w-3.5 h-3.5 mr-1" />
                บันทึกข้อมูล
              </Button>

              <Button
                variant="outline"
                className="px-4 py-2 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-600 transition-all duration-200 bg-transparent"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-2" />
                ซิงค์ข้อมูล
              </Button>
            </div>
          </div>

          {/* Ghost Style */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-700">แบบ Ghost</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="ghost"
                className="px-4 py-2 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-200"
              >
                <Save className="w-3.5 h-3.5 mr-1" />
                บันทึกข้อมูล
              </Button>

              <Button
                variant="ghost"
                className="px-4 py-2 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-2" />
                ซิงค์ข้อมูล
              </Button>
            </div>
          </div>

          {/* Gradient Style */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-700">แบบ Gradient</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Save className="w-3.5 h-3.5 mr-0.5" />
                บันทึกข้อมูล
              </Button>

              <Button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <RefreshCw className="w-3.5 h-3.5 mr-2" />
                ซิงค์ข้อมูล
              </Button>
            </div>
          </div>
        </div>

        {/* Usage Tips */}
        <div className="bg-slate-800 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6">คำแนะนำการใช้งาน</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-emerald-400">ปุ่มบันทึกข้อมูล</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• ใช้สีเขียวเพื่อแสดงการกระทำเชิงบวก</li>
                <li>• มี Loading state ขณะบันทึก</li>
                <li>• แสดงสถานะสำเร็จหรือผิดพลาด</li>
                <li>• รองรับการใช้งานด้วยคีย์บอร์ด</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-blue-400">ปุ่มซิงค์ข้อมูล</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• ใช้สีน้ำเงินเพื่อแสดงการซิงโครไนซ์</li>
                <li>• มี Animation หมุนขณะซิงค์</li>
                <li>• ป้องกันการกดซ้ำขณะทำงาน</li>
                <li>• Responsive ใช้งานได้ทุกอุปกรณ์</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

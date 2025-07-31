import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, LineChart } from "lucide-react";

const popularStocks = ["AAPL", "TSLA", "NVDA", "MSFT", "GOOGL"];

export default function StockAnalysisPage() {
  const [stock, setStock] = useState("AAPL");
  const [note, setNote] = useState("");
  const [agree, setAgree] = useState(null);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">AI วิเคราะห์หุ้นต่างประเทศ (ภาษาไทย)</h1>

      <div className="flex gap-2 items-center flex-wrap">
        <label className="font-semibold">เลือกหุ้นยอดนิยม:</label>
        {popularStocks.map((s) => (
          <Button key={s} variant={stock === s ? "default" : "outline"} onClick={() => setStock(s)}>{s}</Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-2">
          <iframe
            src={`https://s.tradingview.com/embed-widget/mini-symbol-overview/?symbol=NASDAQ:${stock}&locale=th`}
            width="100%"
            height="220"
            frameBorder="0"
            allowTransparency
            allowFullScreen
          ></iframe>
        </CardContent>
      </Card>

      <Tabs defaultValue="ai" className="w-full">
        <TabsList>
          <TabsTrigger value="ai"><LineChart className="w-4 h-4 mr-1" /> วิเคราะห์โดย AI</TabsTrigger>
          <TabsTrigger value="you"><BarChart className="w-4 h-4 mr-1" /> ความเห็นของคุณ</TabsTrigger>
        </TabsList>

        <TabsContent value="ai">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <p className="text-lg font-semibold">🔼 แนวโน้มขาขึ้น (Bullish)</p>
                <p>
                  RSI ปัจจุบันอยู่ที่ 28 (ต่ำกว่า 30) → ภาวะ Oversold ✅<br />
                  Volume เพิ่มขึ้นมากกว่าค่าเฉลี่ย 3 วัน ✅<br />
                  ข่าว: Apple เตรียมเปิดตัวสินค้าใหม่ที่ยอดขายคาดว่าจะเติบโต ✅<br />
                </p>
              </div>

              <div className="bg-gray-100 p-3 rounded-md">
                <p className="font-semibold mb-1">🧠 ปัจจัยที่นักลงทุนมืออาชีพให้ความสำคัญ:</p>
                <ul className="list-disc list-inside">
                  <li>RSI ต่ำ → โอกาสเกิดการดีดตัวกลับ</li>
                  <li>Volume สูงผิดปกติ → ความสนใจจากนักลงทุนเพิ่ม</li>
                  <li>ข่าวดีเชิงบวก → ส่งผลต่อ Sentiment ตลาด</li>
                </ul>
              </div>

              <div className="text-sm text-gray-600 italic">
                *ข้อมูลข้างต้นสรุปโดย AI จากพฤติกรรมของนักลงทุนที่มีกำไรจริงในอดีต
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="you">
          <Card>
            <CardContent className="p-4 space-y-2">
              <p>คุณเห็นด้วยกับการวิเคราะห์ของ AI หรือไม่?</p>
              <div className="flex gap-2">
                <Button variant={agree === true ? "default" : "outline"} onClick={() => setAgree(true)}>เห็นด้วย</Button>
                <Button variant={agree === false ? "default" : "outline"} onClick={() => setAgree(false)}>ไม่เห็นด้วย</Button>
              </div>
              <Textarea
                placeholder="เขียนความคิดเห็นของคุณ..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
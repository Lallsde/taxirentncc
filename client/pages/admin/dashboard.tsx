"use client"

import { useState } from "react"
import { BarChart, Users, CreditCard, TrendingUp, Calendar, MapPin, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
Table, 
TableBody, 
TableCaption, 
TableCell, 
TableHead, 
TableHeader, 
TableRow 
} from "@/components/ui/table"

export default function AdminDashboard() {
const [selectedMonth, setSelectedMonth] = useState("Maggio")

// Dati di esempio
const stats = {
  totalRevenue: "€12,450",
  activeSubscriptions: 89,
  monthlyGrowth: "+12%",
  popularPlan: "Premium"
}

const subscriptions = [
  { id: 1, user: "Mario Rossi", plan: "Premium", startDate: "01/05/2023", status: "Attivo" },
  { id: 2, user: "Giulia Bianchi", plan: "Base", startDate: "15/04/2023", status: "Attivo" },
  { id: 3, user: "Luca Verdi", plan: "Gold", startDate: "03/05/2023", status: "In sospeso" },
  { id: 4, user: "Anna Neri", plan: "Premium", startDate: "20/04/2023", status: "Attivo" },
  { id: 5, user: "Paolo Gialli", plan: "Base", startDate: "10/05/2023", status: "Attivo" },
]

const rides = [
  { id: 1, user: "Mario Rossi", date: "05/05/2023", from: "Via Roma 1", to: "Piazza Duomo", status: "Completata" },
  { id: 2, user: "Giulia Bianchi", date: "06/05/2023", from: "Via Garibaldi 23", to: "Stazione Centrale", status: "In corso" },
  { id: 3, user: "Luca Verdi", date: "07/05/2023", from: "Corso Italia 45", to: "Aeroporto", status: "Programmata" },
  { id: 4, user: "Anna Neri", date: "08/05/2023", from: "Viale Europa 78", to: "Centro Commerciale", status: "Completata" },
  { id: 5, user: "Paolo Gialli", date: "09/05/2023", from: "Piazza Libertà", to: "Ospedale", status: "Programmata" },
]

return (
  <div className="min-h-screen bg-black text-white p-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#FF7F27]">Dashboard Amministratore TaxiRentNcc</h1>
          <p className="text-zinc-400 mt-2">Gestisci abbonamenti, monitora le corse e analizza le prestazioni del servizio.</p>
        </div>
        <Button variant="outline" className="bg-zinc-800 text-white hover:bg-zinc-700">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#FF7F27]">Ricavi Totali</CardTitle>
            <CreditCard className="h-4 w-4 text-[#FF7F27]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue}</div>
            <p className="text-xs text-zinc-400">+20.1% rispetto al mese scorso</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#FF7F27]">Abbonamenti Attivi</CardTitle>
            <Users className="h-4 w-4 text-[#FF7F27]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
            <p className="text-xs text-zinc-400">+180.1% rispetto al mese scorso</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#FF7F27]">Crescita Mensile</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#FF7F27]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyGrowth}</div>
            <p className="text-xs text-zinc-400">+19% rispetto al mese scorso</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#FF7F27]">Piano Più Popolare</CardTitle>
            <BarChart className="h-4 w-4 text-[#FF7F27]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.popularPlan}</div>
            <p className="text-xs text-zinc-400">+7% di nuove sottoscrizioni</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-4">
        <TabsList className="bg-zinc-800">
          <TabsTrigger value="subscriptions" className="data-[state=active]:bg-[#FF7F27]">
            Abbonamenti
          </TabsTrigger>
          <TabsTrigger value="rides" className="data-[state=active]:bg-[#FF7F27]">
            Corse
          </TabsTrigger>
        </TabsList>
        <TabsContent value="subscriptions">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-[#FF7F27]">Abbonamenti Attivi</CardTitle>
              <CardDescription className="text-zinc-400">
                Elenco degli abbonamenti attualmente attivi.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Lista degli abbonamenti attivi al {new Date().toLocaleDateString()}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Utente</TableHead>
                    <TableHead className="text-white">Piano</TableHead>
                    <TableHead className="text-white">Data Inizio</TableHead>
                    <TableHead className="text-white">Stato</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium text-white">{sub.user}</TableCell>
                      <TableCell className="text-white">{sub.plan}</TableCell>
                      <TableCell className="text-white">{sub.startDate}</TableCell>
                      <TableCell className="text-white">{sub.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rides">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-[#FF7F27]">Corse Recenti</CardTitle>
              <CardDescription className="text-zinc-400">
                Elenco delle corse recenti e programmate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Lista delle corse recenti al {new Date().toLocaleDateString()}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Utente</TableHead>
                    <TableHead className="text-white">Data</TableHead>
                    <TableHead className="text-white">Da</TableHead>
                    <TableHead className="text-white">A</TableHead>
                    <TableHead className="text-white">Stato</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rides.map((ride) => (
                    <TableRow key={ride.id}>
                      <TableCell className="font-medium text-white">{ride.user}</TableCell>
                      <TableCell className="text-white">{ride.date}</TableCell>
                      <TableCell className="text-white">{ride.from}</TableCell>
                      <TableCell className="text-white">{ride.to}</TableCell>
                      <TableCell className="text-white">{ride.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8 bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-[#FF7F27]">Analisi Mensile</CardTitle>
          <CardDescription className="text-zinc-400">
            Seleziona un mese per visualizzare le statistiche dettagliate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="month" className="text-white">Mese</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger id="month" className="bg-zinc-800 text-white border-zinc-700">
                  <SelectValue placeholder="Seleziona un mese" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gennaio">Gennaio</SelectItem>
                  <SelectItem value="Febbraio">Febbraio</SelectItem>
                  <SelectItem value="Marzo">Marzo</SelectItem>
                  <SelectItem value="Aprile">Aprile</SelectItem>
                  <SelectItem value="Maggio">Maggio</SelectItem>
                  <SelectItem value="Giugno">Giugno</SelectItem>
                  <SelectItem value="Luglio">Luglio</SelectItem>
                  <SelectItem value="Agosto">Agosto</SelectItem>
                  <SelectItem value="Settembre">Settembre</SelectItem>
                  <SelectItem value="Ottobre">Ottobre</SelectItem>
                  <SelectItem value="Novembre">Novembre</SelectItem>
                  <SelectItem value="Dicembre">Dicembre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="year" className="text-white">Anno</Label>
              <Input id="year" type="number" defaultValue={2023} className="bg-zinc-800 text-white border-zinc-700" />
            </div>
          </div>
          <div className="h-[200px] bg-zinc-800 rounded-md flex items-center justify-center">
            <p className="text-zinc-400">Grafico delle statistiche per {selectedMonth} 2023</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
)
}

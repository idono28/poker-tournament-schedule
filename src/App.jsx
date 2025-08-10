import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, DollarSign, Trophy, ChevronRight, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import tournamentsData from './assets/tournaments.json'
import './App.css'

function App() {
  const [tournaments, setTournaments] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [filteredTournaments, setFilteredTournaments] = useState([])

  useEffect(() => {
    setTournaments(tournamentsData)
    setFilteredTournaments(tournamentsData)
  }, [])

  useEffect(() => {
    let filtered = tournaments

    if (selectedDate) {
      filtered = filtered.filter(tournament => tournament.date === selectedDate)
    }

    if (searchTerm) {
      filtered = filtered.filter(tournament => 
        tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tournament.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredTournaments(filtered)
  }, [tournaments, selectedDate, searchTerm])

  const uniqueDates = [...new Set(tournaments.map(tournament => tournament.date))].sort()

  const groupedTournaments = filteredTournaments.reduce((acc, tournament) => {
    if (!acc[tournament.date]) {
      acc[tournament.date] = []
    }
    acc[tournament.date].push(tournament)
    return acc
  }, {})

  const formatTime = (time) => {
    if (time === '-') return '-'
    return time
  }

  const formatEntryFee = (fee) => {
    if (fee === '-') return '無料'
    return fee
  }

  const formatChips = (chips) => {
    if (chips === '-') return '-'
    return chips.replace('Chips', '').trim() + ' チップ'
  }

  const getTournamentType = (name) => {
    if (name.includes('Main Event')) return 'メインイベント'
    if (name.includes('Championship')) return 'チャンピオンシップ'
    if (name.includes('Satellite')) return 'サテライト'
    if (name.includes('Final')) return 'ファイナル'
    return '通常'
  }

  const getTournamentTypeColor = (name) => {
    if (name.includes('Main Event')) return 'bg-red-500'
    if (name.includes('Championship')) return 'bg-purple-500'
    if (name.includes('Satellite')) return 'bg-blue-500'
    if (name.includes('Final')) return 'bg-green-500'
    return 'bg-gray-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">SPADIE 38th</h1>
                <p className="text-purple-300">ポーカートーナメントスケジュール</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">2025年8月8日〜17日</p>
              <p className="text-purple-300 text-sm">ベルサール新宿セントラルパーク</p>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="トーナメント名またはIDで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedDate === '' ? 'default' : 'outline'}
              onClick={() => setSelectedDate('')}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              全ての日付
            </Button>
            {uniqueDates.map(date => (
              <Button
                key={date}
                variant={selectedDate === date ? 'default' : 'outline'}
                onClick={() => setSelectedDate(date)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {date}
              </Button>
            ))}
          </div>
        </div>

        {/* Tournament List */}
        <div className="space-y-8">
          <AnimatePresence>
            {Object.entries(groupedTournaments).map(([date, dateTournaments]) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                    <Calendar className="h-6 w-6 mr-2 text-purple-400" />
                    {date}
                  </h2>
                  <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-24"></div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {dateTournaments.map((tournament, index) => (
                    <motion.div
                      key={`${tournament.date}-${tournament.id}-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge 
                                      variant="secondary" 
                                      className={`${getTournamentTypeColor(tournament.name)} text-white text-xs`}
                                    >
                                      {getTournamentType(tournament.name)}
                                    </Badge>
                                    <Badge variant="outline" className="text-purple-300 border-purple-300">
                                      #{tournament.id}
                                    </Badge>
                                  </div>
                                  <CardTitle className="text-white text-lg leading-tight">
                                    {tournament.name}
                                  </CardTitle>
                                </div>
                                <ChevronRight className="h-5 w-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex items-center text-purple-300 text-sm">
                                <Clock className="h-4 w-4 mr-2" />
                                開始: {formatTime(tournament.start_time)} | 受付終了: {formatTime(tournament.reg_close)}
                              </div>
                              <div className="flex items-center text-green-300 text-sm">
                                <DollarSign className="h-4 w-4 mr-2" />
                                {formatEntryFee(tournament.entry_fee)}
                              </div>
                              <div className="flex items-center text-blue-300 text-sm">
                                <Users className="h-4 w-4 mr-2" />
                                {formatChips(tournament.chips)}
                              </div>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-900 border-white/20 text-white max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-2xl text-purple-300">
                              {tournament.name}
                            </DialogTitle>
                            <DialogDescription className="text-gray-300">
                              トーナメント詳細情報
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <h4 className="font-semibold text-purple-300">基本情報</h4>
                                <div className="space-y-1 text-sm">
                                  <p><span className="text-gray-400">ID:</span> #{tournament.id}</p>
                                  <p><span className="text-gray-400">日付:</span> {tournament.date}</p>
                                  <p><span className="text-gray-400">開始時間:</span> {formatTime(tournament.start_time)}</p>
                                  <p><span className="text-gray-400">受付終了:</span> {formatTime(tournament.reg_close)}</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-semibold text-purple-300">参加情報</h4>
                                <div className="space-y-1 text-sm">
                                  <p><span className="text-gray-400">参加費:</span> {formatEntryFee(tournament.entry_fee)}</p>
                                  <p><span className="text-gray-400">初期チップ:</span> {formatChips(tournament.chips)}</p>
                                  <p><span className="text-gray-400">種別:</span> {getTournamentType(tournament.name)}</p>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                              <h4 className="font-semibold text-purple-300 mb-2">注意事項</h4>
                              <ul className="text-sm text-gray-300 space-y-1">
                                <li>• ファーストエントリー時に別途ドリンク代1,000円が必要です</li>
                                <li>• ルールはJOPT Official Ruleを採用します</li>
                                <li>• 詳細な構造やプライズ情報は公式PDFをご確認ください</li>
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">トーナメントが見つかりません</h3>
            <p className="text-gray-400">検索条件を変更してお試しください</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">SPADIE 38th</h3>
            <p className="text-gray-400 mb-4">2025年8月8日〜17日 | ベルサール新宿セントラルパーク</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>公式サイト: pokerguild.jp</span>
              <span>X: @SPADIE_FINAL_</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


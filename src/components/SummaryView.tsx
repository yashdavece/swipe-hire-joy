import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  Mail,
  ChevronDown,
  Eye 
} from "lucide-react";
import { mockCandidates } from "@/data/mockCandidates";

export function SummaryView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Extended mock data with various statuses
  const allCandidates = [
    ...mockCandidates.map(candidate => ({
      ...candidate,
      status: Math.random() > 0.6 ? 'shortlisted' : 
               Math.random() > 0.3 ? 'rejected' : 'pending',
      interviewDate: Math.random() > 0.5 ? '2024-01-22 10:00 AM' : null,
      notes: 'Strong technical background, good communication skills'
    }))
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-primary text-primary-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      case 'interviewed':
        return 'bg-secondary text-secondary-foreground';
      case 'hired':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredCandidates = allCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: allCandidates.length,
    shortlisted: allCandidates.filter(c => c.status === 'shortlisted').length,
    rejected: allCandidates.filter(c => c.status === 'rejected').length,
    pending: allCandidates.filter(c => c.status === 'pending').length,
    hired: allCandidates.filter(c => c.status === 'hired').length,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Candidate Summary</h1>
        <p className="text-muted-foreground">
          Complete overview of all reviewed candidates and their status
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Candidates</h3>
          <p className="text-2xl font-bold">{stats.total}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Shortlisted</h3>
          <p className="text-2xl font-bold text-primary">{stats.shortlisted}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Rejected</h3>
          <p className="text-2xl font-bold text-destructive">{stats.rejected}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Pending</h3>
          <p className="text-2xl font-bold text-muted-foreground">{stats.pending}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Hired</h3>
          <p className="text-2xl font-bold text-accent">{stats.hired}</p>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border rounded-md bg-background text-foreground appearance-none w-full sm:w-auto"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="interviewed">Interviewed</option>
                <option value="hired">Hired</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>
      </Card>

      {/* Candidates Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Interview Date</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={candidate.profileImage} alt={candidate.name} />
                      <AvatarFallback>
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{candidate.name}</div>
                      <div className="text-sm text-muted-foreground">{candidate.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{candidate.role}</TableCell>
                <TableCell>{candidate.experience}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(candidate.status)}>
                    {candidate.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {candidate.interviewDate ? (
                    <div className="flex items-center space-x-1 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{candidate.interviewDate}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>{candidate.appliedDate}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No candidates match your current filters.</p>
        </div>
      )}
    </div>
  );
}
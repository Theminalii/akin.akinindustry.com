'use client'

import { type ChangeEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Briefcase,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  ShieldCheck,
  Send,
  Users,
} from 'lucide-react'

import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAdmin } from '@/lib/admin/context'

const benefits = [
  'Böyük tikinti və sənaye layihələrində iştirak imkanı',
  'Peşəkar texniki komanda ilə birlikdə inkişaf mühiti',
  'Təhlükəsizlik və keyfiyyət standartlarına uyğun iş sistemi',
  'Karyera yüksəlişi və yeni layihələrdə rotasiya imkanı',
]

const processSteps = [
  'Uyğun vakansiyanı seç və müraciət formasını doldur.',
  'HR və texniki komanda təcrübəni və sənədlərini yoxlasın.',
  'Uyğun namizədlərlə texniki və layihə yönümlü müsahibə keçirilsin.',
  'Final mərhələdə iş təklifi və onboarding planı təqdim olunsun.',
]

type ApplicationForm = {
  fullName: string
  email: string
  phone: string
  city: string
  position: string
  department: string
  experienceYears: string
  education: string
  specialization: string
  currentCompany: string
  currentRole: string
  expectedSalary: string
  availability: string
  employmentType: string
  projectExperience: string
  softwareSkills: string
  certifications: string
  languages: string
  references: string
  coverLetter: string
  drivingLicense: string
  hseTraining: string
  travelReady: string
  shiftReady: string
  englishLevel: string
  cvFileName: string
}

const emptyForm: ApplicationForm = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  position: '',
  department: '',
  experienceYears: '',
  education: '',
  specialization: '',
  currentCompany: '',
  currentRole: '',
  expectedSalary: '',
  availability: '',
  employmentType: 'full-time',
  projectExperience: '',
  softwareSkills: '',
  certifications: '',
  languages: '',
  references: '',
  coverLetter: '',
  drivingLicense: 'yes',
  hseTraining: 'yes',
  travelReady: 'yes',
  shiftReady: 'no',
  englishLevel: 'intermediate',
  cvFileName: '',
}

export default function CareersPage() {
  const { jobs } = useAdmin()
  const [formData, setFormData] = useState<ApplicationForm>(emptyForm)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const departmentOptions = useMemo(() => {
    return Array.from(new Set(jobs.map((job) => job.department)))
  }, [jobs])

  const handleCvUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setCvFile(file)
    setFormData((prev) => ({ ...prev, cvFileName: file.name }))
    e.target.value = ''
  }

  const handleApplyToJob = (title: string, department: string, type: string) => {
    setFormData((prev) => ({
      ...prev,
      position: title,
      department,
      employmentType: type,
    }))
    setSubmitted(false)
    document.getElementById('career-application-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitMessage('')
    setSubmitted(false)

    try {
      const requestFormData = new FormData()

      Object.entries(formData).forEach(([key, value]) => {
        requestFormData.append(key, value)
      })

      if (cvFile) {
        requestFormData.append('cvFile', cvFile)
      }

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: requestFormData,
      })

      const result = (await response.json()) as {
        success: boolean
        message?: string
        results?: Array<{ channel: string; success: boolean; message: string }>
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Göndəriş alınmadı.')
      }

      const successfulChannels = result.results
        ?.filter((item) => item.success)
        .map((item) => item.channel)
        .join(', ')

      setSubmitted(true)
      setSubmitMessage(
        successfulChannels
          ? `Müraciət göndərildi. Aktiv kanallar: ${successfulChannels}.`
          : result.message || 'Müraciət göndərildi.'
      )
      setFormData(emptyForm)
      setCvFile(null)
    } catch (error) {
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'Müraciət göndərilə bilmədi. Bildiriş ayarlarını yoxla.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Karyera"
        description="Peşəkar komandamıza qoşulun"
        breadcrumbs={[{ label: 'Karyera' }]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <Card className="overflow-hidden border-border/50 shadow-sm">
              <CardContent className="p-8 md:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Building2 className="h-4 w-4" />
                  Tikinti komandamıza qoşul
                </span>
                <h2 className="mt-6 text-3xl md:text-4xl font-bold text-foreground">
                  Sahədə və ofisdə güclü mütəxəssislər axtarırıq
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  Mühəndislik, layihə idarəetməsi, HSE, BIM, satınalma və sahə icrası üzrə
                  peşəkar namizədlər üçün daha strukturlaşdırılmış müraciət prosesi hazırladıq.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                      <p className="text-sm leading-6 text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Müraciət Prosesi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {processSteps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl border border-border/50 bg-card p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-6">
            {jobs.map((job) => (
              <Card key={job.id} className="overflow-hidden border-border/50 hover:border-primary/30 transition-all">
                <CardHeader className="bg-slate-50/50">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Briefcase size={16} /> {job.department}</span>
                        <span className="flex items-center gap-1"><Clock size={16} /> {job.type}</span>
                      </div>
                    </div>
                    <Button onClick={() => handleApplyToJob(job.title, job.department, job.type)}>
                      Bu vakansiyaya müraciət et
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-6 leading-relaxed">{job.description}</p>
                  <h4 className="text-lg font-semibold mb-3">Tələblər:</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="career-application-form" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <FileText className="h-4 w-4" />
                Detallı Müraciət Formu
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">
                Tikinti layihələri üçün uyğunluğunu ətraflı paylaş
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-muted-foreground leading-7">
                Bu form texniki biliklərini, sahə təcrübəni, təhlükəsizlik hazırlığını və layihə
                uyğunluğunu daha düzgün qiymətləndirməyimiz üçün hazırlanıb.
              </p>
            </div>

            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-6 md:p-8">
                {submitMessage && (
                  <div
                    className={`mb-6 rounded-2xl px-4 py-3 text-sm ${
                      submitted
                        ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border border-red-200 bg-red-50 text-red-700'
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2 xl:col-span-2">
                      <Label htmlFor="fullName">Ad və soyad</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Şəhər / Region</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2 xl:col-span-2">
                      <Label htmlFor="position">Müraciət olunan vakansiya</Label>
                      <select
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                        required
                      >
                        <option value="">Vakansiya seç</option>
                        {jobs.map((job) => (
                          <option key={job.id} value={job.title}>
                            {job.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Şöbə</Label>
                      <select
                        id="department"
                        value={formData.department}
                        onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="">Şöbə seç</option>
                        {departmentOptions.map((department) => (
                          <option key={department} value={department}>
                            {department}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="experienceYears">Sahə təcrübəsi (il)</Label>
                      <Input
                        id="experienceYears"
                        value={formData.experienceYears}
                        onChange={(e) => setFormData((prev) => ({ ...prev, experienceYears: e.target.value }))}
                        placeholder="Məs: 7"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education">Təhsil</Label>
                      <Input
                        id="education"
                        value={formData.education}
                        onChange={(e) => setFormData((prev) => ({ ...prev, education: e.target.value }))}
                        placeholder="Məs: İnşaat mühəndisliyi"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">İxtisaslaşma</Label>
                      <Input
                        id="specialization"
                        value={formData.specialization}
                        onChange={(e) => setFormData((prev) => ({ ...prev, specialization: e.target.value }))}
                        placeholder="BIM, HSE, sahə icrası və s."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="englishLevel">İngilis dili səviyyəsi</Label>
                      <select
                        id="englishLevel"
                        value={formData.englishLevel}
                        onChange={(e) => setFormData((prev) => ({ ...prev, englishLevel: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="basic">Basic</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="fluent">Fluent</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2 xl:col-span-2">
                      <Label htmlFor="currentCompany">Hazırkı şirkət</Label>
                      <Input
                        id="currentCompany"
                        value={formData.currentCompany}
                        onChange={(e) => setFormData((prev) => ({ ...prev, currentCompany: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentRole">Hazırkı vəzifə</Label>
                      <Input
                        id="currentRole"
                        value={formData.currentRole}
                        onChange={(e) => setFormData((prev) => ({ ...prev, currentRole: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedSalary">Gözlənilən əməkhaqqı</Label>
                      <Input
                        id="expectedSalary"
                        value={formData.expectedSalary}
                        onChange={(e) => setFormData((prev) => ({ ...prev, expectedSalary: e.target.value }))}
                        placeholder="AZN"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="availability">İşə başlama tarixi</Label>
                      <Input
                        id="availability"
                        type="date"
                        value={formData.availability}
                        onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employmentType">İş rejimi</Label>
                      <select
                        id="employmentType"
                        value={formData.employmentType}
                        onChange={(e) => setFormData((prev) => ({ ...prev, employmentType: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="full-time">Tam ştat</option>
                        <option value="part-time">Yarım ştat</option>
                        <option value="contract">Müqavilə</option>
                        <option value="rotation">Rotasiya / növbəli</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="travelReady">Ezamiyyətə hazırdır?</Label>
                      <select
                        id="travelReady"
                        value={formData.travelReady}
                        onChange={(e) => setFormData((prev) => ({ ...prev, travelReady: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="yes">Bəli</option>
                        <option value="no">Xeyr</option>
                        <option value="partly">Qismən</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shiftReady">Növbəli iş rejiminə hazırdır?</Label>
                      <select
                        id="shiftReady"
                        value={formData.shiftReady}
                        onChange={(e) => setFormData((prev) => ({ ...prev, shiftReady: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="yes">Bəli</option>
                        <option value="no">Xeyr</option>
                        <option value="if-needed">Lazım olsa</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="drivingLicense">Sürücülük vəsiqəsi</Label>
                      <select
                        id="drivingLicense"
                        value={formData.drivingLicense}
                        onChange={(e) => setFormData((prev) => ({ ...prev, drivingLicense: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="yes">Var</option>
                        <option value="no">Yoxdur</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hseTraining">HSE / təhlükəsizlik təlimi</Label>
                      <select
                        id="hseTraining"
                        value={formData.hseTraining}
                        onChange={(e) => setFormData((prev) => ({ ...prev, hseTraining: e.target.value }))}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                      >
                        <option value="yes">Keçmişəm</option>
                        <option value="no">Keçməmişəm</option>
                        <option value="expired">Vaxtı bitib</option>
                      </select>
                    </div>
                    <div className="space-y-2 xl:col-span-2">
                      <Label htmlFor="cvUpload">CV / Resume</Label>
                      <label className="flex h-10 cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3 text-sm text-muted-foreground">
                        <span>{formData.cvFileName || 'Kompüterdən fayl seç'}</span>
                        <span className="inline-flex items-center gap-2 text-foreground">
                          <FileText className="h-4 w-4" />
                          Fayl yüklə
                        </span>
                        <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCvUpload} />
                      </label>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="softwareSkills">Proqram bilikləri</Label>
                      <Textarea
                        id="softwareSkills"
                        rows={4}
                        value={formData.softwareSkills}
                        onChange={(e) => setFormData((prev) => ({ ...prev, softwareSkills: e.target.value }))}
                        placeholder="AutoCAD, Revit, Primavera, MS Project, Excel və s."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certifications">Sertifikatlar və lisenziyalar</Label>
                      <Textarea
                        id="certifications"
                        rows={4}
                        value={formData.certifications}
                        onChange={(e) => setFormData((prev) => ({ ...prev, certifications: e.target.value }))}
                        placeholder="HSE, PMP, ISO, qaynaq sertifikatı və s."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectExperience">İştirak etdiyin tikinti layihələri</Label>
                    <Textarea
                      id="projectExperience"
                      rows={5}
                      value={formData.projectExperience}
                      onChange={(e) => setFormData((prev) => ({ ...prev, projectExperience: e.target.value }))}
                      placeholder="Layihənin tipi, həcmi, sənin rolun, komanda ölçüsü və əsas nailiyyətləri yaz."
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="languages">Dil bilikləri</Label>
                      <Textarea
                        id="languages"
                        rows={4}
                        value={formData.languages}
                        onChange={(e) => setFormData((prev) => ({ ...prev, languages: e.target.value }))}
                        placeholder="Azərbaycan, İngilis, Rus və s."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="references">Referanslar</Label>
                      <Textarea
                        id="references"
                        rows={4}
                        value={formData.references}
                        onChange={(e) => setFormData((prev) => ({ ...prev, references: e.target.value }))}
                        placeholder="Əvvəlki rəhbər, layihə meneceri və ya HR əlaqəsi"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Özünü və bu vəzifəyə uyğunluğunu qısa təsvir et</Label>
                    <Textarea
                      id="coverLetter"
                      rows={6}
                      value={formData.coverLetter}
                      onChange={(e) => setFormData((prev) => ({ ...prev, coverLetter: e.target.value }))}
                      placeholder="Texniki güclü tərəflərin, sahə təcrübən və niyə bu komandaya uyğun olduğunu yaz."
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-border/50 bg-card p-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <p className="text-sm font-medium text-foreground">Komanda işi</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Sahə və ofis koordinasiyasında təcrübəni cover letter hissəsində qeyd et.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-card p-4">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        <p className="text-sm font-medium text-foreground">Təhlükəsizlik</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        HSE və təhlükəsizlik qaydaları ilə işləmə təcrübən bizim üçün vacibdir.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-card p-4">
                      <div className="flex items-center gap-3">
                        <CalendarClock className="h-5 w-5 text-primary" />
                        <p className="text-sm font-medium text-foreground">Hazırlıq</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Başlama tarixi və ezamiyyət uyğunluğu layihə planlamasında nəzərə alınır.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                      Təcili müraciət üçün alternativ olaraq <Link href="/elaqe" className="text-primary underline">əlaqə</Link> səhifəsindən də bizə yaza bilərsən.
                    </p>
                    <Button type="submit" size="lg" className="group" disabled={submitting}>
                      {submitting ? 'Göndərilir...' : 'Müraciəti göndər'}
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

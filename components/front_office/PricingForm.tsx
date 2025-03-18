"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const formSchema = z.object({
  nom: z.string().min(2, { message: "Le nom est requis" }),
  prenom: z.string().min(2, { message: "Le prénom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  telephone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  entreprise: z
    .string()
    .min(2, { message: "Le nom de l'entreprise est requis" }),
  poste: z.string().min(2, { message: "Le poste est requis" }),
  taille: z.string(),
  message: z.string().optional(),
});

export function PricingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      entreprise: "",
      poste: "",
      taille: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="grid md:grid-cols-[1fr_2fr] overflow-hidden rounded-2xl backdrop-blur-sm"
    >
      <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/50 p-6 md:p-10 text-white flex flex-col justify-between relative overflow-hidden border-r border-white/10">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">ATS</h3>
          <p className="text-sm md:text-base mb-6 uppercase tracking-wide text-blue-200">
            Applicant Tracking System
          </p>
        </div>
        <div className="mt-auto">
          <p className="text-sm md:text-base mb-2 font-medium">Contactez-nous</p>
          <p className="text-xs md:text-sm text-blue-200">
            Obtenez une offre personnalisée pour transformer votre recrutement.
          </p>
        </div>
      </div>

      <div className="p-6 md:p-10 bg-white/10 backdrop-blur-sm relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Prénom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jean"
                        {...field}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prenom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dupont"
                        {...field}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Email professionnel
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jean.dupont@entreprise.com"
                        {...field}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Téléphone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+33 6 12 34 56 78"
                        {...field}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="entreprise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Entreprise</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nom de votre entreprise"
                        {...field}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="poste"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Poste</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Directeur RH"
                        {...field}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="taille"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Taille de l&apos;entreprise
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white h-12">
                        <SelectValue placeholder="Sélectionnez une option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employés</SelectItem>
                      <SelectItem value="11-50">11-50 employés</SelectItem>
                      <SelectItem value="51-200">51-200 employés</SelectItem>
                      <SelectItem value="201-500">201-500 employés</SelectItem>
                      <SelectItem value="501+">Plus de 500 employés</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Message (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez vos besoins spécifiques..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                className="rounded-[24px] h-12 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 font-semibold shadow-xl shadow-cyan-500/20 transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
              >
                Envoyer ma demande
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
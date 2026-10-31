import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion, Variants } from "framer-motion";
import {
  UserRound,
  AtSign,
  TextCursorInput,
  MessageSquareText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";
import { Bio } from "../../data/personal";
import contactImage from "../../images/Contact.webp";
import AnimatedPillLink from "../AnimatedPillLink";
import GlowButton from "./GlowButton";
import './ContactFeedback.css';

const cubicEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// Animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15, ease: cubicEase },
  },
};

const Contact = () => {
  const reducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setIsLoading(true);
    setIsSuccess(false);
    setErrorMessage(null);

    emailjs
      .sendForm(
        "service_1aoal9g",
        "template_jakhopa",
        form.current,
        "IZnfA0HyiWOQDh3Cl"
      )
      .then(
        () => {
          setIsLoading(false);
          setIsSuccess(true);
          form.current?.reset();
        },
        (error) => {
          setIsLoading(false);
          setErrorMessage(
            error?.text ||
              "Failed to send message. Please try again or reach out directly via email."
          );
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#0e0e14] pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-28 md:pb-36"
    >
      {/* ── Ambient Background Glows ──
      <div className="absolute top-[15%] left-[-8%] w-[500px] h-[500px] bg-primary/[0.08] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[35%] left-[30%] w-[450px] h-[450px] bg-primary/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[550px] h-[550px] bg-primary/[0.09] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-primary/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-b from-transparent to-[#0e0e14] pointer-events-none" /> */}

      {/* ── Subtle Technical Dot Texture on Right ── */}
      <div
        aria-hidden="true"
        className="absolute top-12 right-0 w-[500px] h-[550px] pointer-events-none opacity-40 hidden sm:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139, 92, 246, 0.18) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at 70% 40%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 40%, black 20%, transparent 70%)",
        }}
      />

      {/* ── Giant Background Typography ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 sm:-top-1 md:-top-2 lg:-top-3 left-0 w-full pointer-events-none select-none overflow-hidden"
      >
        <span
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          className="block text-left font-bold tracking-[-0.04em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-white/[0.01] text-[14vw] sm:text-[13vw] md:text-[11.5vw] lg:text-[10.5vw] xl:text-[10vw] leading-none whitespace-nowrap ml-[-1%]"
        >
          CONTACT
        </span>
      </div>

      {/* ── Main Container ── */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[46.6%_53.4%] overflow-hidden rounded-[28px] sm:rounded-[32px] border border-2 border-primary/10 bg-[#12111d]/75">
          {/* Portrait artwork with independent, clickable overlays. */}
          <div className="relative aspect-[1844/2304] lg:aspect-auto min-w-0 overflow-hidden">
            <img
              src={contactImage}
              alt="Kavindu Dilshan — turning ideas into reality"
              width={1844}
              height={2304}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-90 select-none pointer-events-none"
            />
            <img
              src="/Icon.svg"
              alt="Kavindu Dilshan logo"
              className="absolute right-[6%] top-[8%] w-[8%] h-auto brightness-0 invert"
            />
            <AnimatedPillLink href={`mailto:${Bio.email}`} className="absolute bottom-[4.7%] left-[9%]">
              Email Me
            </AnimatedPillLink>
          </div>

          {/* ═══ RIGHT: Contact Form Panel ═══ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className="w-full min-w-0"
          >
            <div className="relative h-full p-6 sm:p-8 lg:p-9 xl:p-10 overflow-hidden">
              {/* Inner ambient glows */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Form Header */}
                <div className="mb-7">
                  <h3 className="text-[22px] sm:text-[26px] font-bold text-white tracking-tight leading-tight">
                    Start a conversation
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-gray-400 mt-1.5">
                    Fill out the form and I&apos;ll get back to you soon.
                  </p>
                </div>

                <form
                  ref={form}
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="flex flex-col gap-4"
                >
                  {/* Name Input */}
                  <div>
                    <label htmlFor="from_name" className="sr-only">
                      Name
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 transition-colors duration-200 group-focus-within:text-primary pointer-events-none">
                        <UserRound size={18} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <input
                        id="from_name"
                        name="from_name"
                        type="text"
                        required
                        placeholder="Name"
                        className="w-full h-[52px] sm:h-[56px] pl-11 pr-4 rounded-xl sm:rounded-[14px] bg-white/[0.03] border border-white/10 text-white placeholder-white/35 text-[14px] sm:text-[15px] outline-none transition-all duration-200 focus:border-primary/60 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(133,76,230,0.2)]"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="from_email" className="sr-only">
                      Email
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 transition-colors duration-200 group-focus-within:text-primary pointer-events-none">
                        <AtSign size={18} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <input
                        id="from_email"
                        name="from_email"
                        type="email"
                        required
                        placeholder="Email"
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        className="w-full h-[52px] sm:h-[56px] pl-11 pr-4 rounded-xl sm:rounded-[14px] bg-white/[0.03] border border-white/10 text-white placeholder-white/35 text-[14px] sm:text-[15px] outline-none transition-all duration-200 focus:border-primary/60 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(133,76,230,0.2)]"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label htmlFor="subject" className="sr-only">
                      Subject
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 transition-colors duration-200 group-focus-within:text-primary pointer-events-none">
                        <TextCursorInput size={18} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        placeholder="Subject"
                        className="w-full h-[52px] sm:h-[56px] pl-11 pr-4 rounded-xl sm:rounded-[14px] bg-white/[0.03] border border-white/10 text-white placeholder-white/35 text-[14px] sm:text-[15px] outline-none transition-all duration-200 focus:border-primary/60 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(133,76,230,0.2)]"
                      />
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-4 text-white/35 transition-colors duration-200 group-focus-within:text-primary pointer-events-none">
                        <MessageSquareText size={18} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Message"
                        className="w-full min-h-[120px] sm:min-h-[140px] pl-11 pr-4 py-3.5 rounded-xl sm:rounded-[14px] bg-white/[0.03] border border-white/10 text-white placeholder-white/35 text-[14px] sm:text-[15px] outline-none resize-none transition-all duration-200 focus:border-primary/60 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(133,76,230,0.2)]"
                      />
                    </div>
                  </div>

                  {/* Send Button */}
                  <GlowButton type="submit" disabled={isLoading} aria-busy={isLoading}>
                    {isLoading ? (
                      <><Loader2 size={18} className="animate-spin" /><span>Sending...</span></>
                    ) : "Send Message"}
                  </GlowButton>

                  {/* Status / Feedback Notifications */}
                  {createPortal(
                    <AnimatePresence>
                      {(isSuccess || errorMessage) && (
                        <motion.div
                          key={isSuccess ? 'success' : 'error'}
                          className="contact-feedback"
                          role={isSuccess ? 'status' : 'alert'}
                          initial={{ opacity: 0, x: reducedMotion ? 0 : 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: reducedMotion ? 0 : 24 }}
                          transition={{ duration: reducedMotion ? 0 : 0.25 }}
                        >
                          {isSuccess
                            ? <CheckCircle2 className="contact-feedback__icon contact-feedback__icon--success" strokeWidth={1.7} aria-hidden="true" />
                            : <AlertCircle className="contact-feedback__icon contact-feedback__icon--error" strokeWidth={1.7} aria-hidden="true" />}
                          <div className="contact-feedback__text">
                            <p className="contact-feedback__title">{isSuccess ? 'Message sent successfully!' : 'Message could not be sent'}</p>
                            <p className="contact-feedback__description">{isSuccess ? 'I’ll get back to you soon.' : errorMessage}</p>
                          </div>
                          <button type="button" className="contact-feedback__close" aria-label="Dismiss notification"
                            onClick={() => { setIsSuccess(false); setErrorMessage(null); }}>
                            <X size={18} aria-hidden="true" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>,
                    document.body
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Contact;


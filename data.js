/* Portfolio content lives here. Add projects, research roles, volunteering, skills, and designs as data. */
window.portfolioData = {
  projects: [
    {
      id: "talan-platform",
      title: "AI Research Support Platform",
      context: "Talan, Tunisia | June-August 2026",
      headline: "Evaluated JEPA models and built a **research support platform** for AI research.",
      impact: ["2 JEPA checkpoints assessed", "4 baseline models compared", "3 research tools delivered"],
      bullets: [
        "Studied **world models** and the **JEPA architecture**; tested I-JEPA and V-JEPA 2 checkpoints for occlusion, blur, embedding structure, and latent prediction.",
        "Compared the released checkpoints with **MAE**, **BEiT**, **DINOv2**, and **CLIP**.",
        "Built an **interactive encyclopedia**, model advisor, and research radar that ingests arXiv papers and extracts structured metadata with an LLM."
      ],
      stack: ["react", "fastapi", "postgresql", "redis", "groq"],
      images: ["assets/talan summer/talan 1.webp", "assets/talan summer/encyclopedia.webp", "assets/talan summer/dash.webp", "assets/talan summer/paper.webp", "assets/talan summer/paper dashboard.webp"],
      links: {}
    },
    {
      id: "e-learnit",
      title: "E-LearNIT (The One)",
      context: "IEEE Region 8 Humanitarian Technologies Competition | November 2025-January 2026",
      headline: "An AI-powered platform for **Tunisian Sign Language recognition** and text-to-speech.",
      impact: ["2nd place", "IEEE Region 8 competition", "Community-validated TSL dataset"],
      bullets: [
        "Contributed to a platform for **real-time Tunisian Sign Language recognition** and text-to-speech.",
        "Helped create a **community-validated TSL dataset**.",
        "Supported technical demonstrations, deployment, and project coordination."
      ],
      stack: ["ai", "tsl", "tts"],
      images: ["assets/region 8 humanitarian technologies competition/1774718961080.webp", "assets/region 8 humanitarian technologies competition/1774718962024.webp", "assets/region 8 humanitarian technologies competition/1785353097311.webp"],
      links: {}
    },
    {
      id: "tunilip",
      title: "TUNILip+",
      context: "Signals & Smart Systems Laboratory (L3S), ENIT | October 2025-April 2026",
      headline: "A browser-based system for **Tunisian Arabic lip reading**, built around a new corpus.",
      impact: ["50+ volunteer speakers", "4 modeling approaches", "Browser-based inference"],
      bullets: [
        "Constructed and preprocessed a **Tunisian Arabic lip-reading corpus**, selecting vocabulary for healthcare applications.",
        "Benchmarked **CNN-BiLSTM**, **MobileNetV2 transfer learning**, **VideoMAE fine-tuning**, and a hybrid ensemble.",
        "Built real-time mouth detection, an inference pipeline, and a **crowdsourcing module** in the browser."
      ],
      stack: ["python", "tensorflowjs", "mediapipe", "keras", "cnn", "videomae"],
      images: ["assets/project-tunilip-1.webp", "assets/project-tunilip-2.webp", "assets/project-tunilip-3.webp"],
      links: {
        github: "https://github.com/yosr580/TUNILip-.git",
        report: "https://drive.google.com/file/d/1dlTboWWM9z6d0yeZWBFFMc_t921f33ER/view?usp=sharing"
      }
    },
    {
      id: "anti-spoofing",
      title: "Anti-Spoofing Module for Facial Recognition",
      context: "Computer Vision Internship, Groupe SFM | July-August 2025",
      headline: "A real-time **face anti-spoofing** workflow for facial recognition and enrollment.",
      impact: ["CNN-based classifier", "Real-time OpenCV inference", "Guided multi-angle capture"],
      bullets: [
        "Researched presentation attacks including printed photos, screen replays, videos, and 2D/3D masks.",
        "Developed a **CNN-based anti-spoofing system** and liveness verification from scratch.",
        "Integrated OpenCV inference into a **live-webcam GUI** with secure login.",
        "Added guided **multi-angle face registration** for enrollment."
      ],
      stack: ["python", "tensorflow", "keras", "opencv", "cnn"],
      images: ["assets/project-antispoofing-1.webp", "assets/project-antispoofing-2.webp", "assets/project-antispoofing-3.webp"],
      links: {
        github: "https://github.com/yosr580/Face-anti-spoofing-module-.git",
        report: "https://drive.google.com/file/d/1SxT4gTt9WsqTBHzb-FCmWP3sCD4qwlVr/view?usp=sharing"
      }
    },
    {
      id: "video-surveillance",
      title: "Intelligent Video Surveillance",
      context: "Team project | Embedded systems and computer vision",
      headline: "A camera-based system for **unknown-face alerts** and attendance reporting.",
      impact: ["Live video capture", "Email alerts with images", "PDF attendance report"],
      bullets: [
        "Combined an **ArduCam** with a Python facial-recognition pipeline.",
        "Detected unknown faces and sent automatic email alerts with the captured image.",
        "Generated a **PDF attendance report** from the system."
      ],
      stack: ["python", "opencv", "arduino", "smtp", "reportlab"],
      images: ["assets/project-surveillance-1.webp", "assets/project-surveillance-2.webp", "assets/project-surveillance-3.webp"],
      links: {}
    },
    {
      id: "fiber-laser",
      title: "Figure-of-Eight Fiber Laser Simulation",
      context: "Optical Fiber Laser System Simulation, ENIT | October 2024-April 2025",
      headline: "A numerical study of **ultrashort pulse dynamics** in a figure-of-eight fiber laser.",
      impact: ["Nonlinear Schrodinger equation", "Split-Step Fourier Method", "Cavity stability study"],
      bullets: [
        "Simulated a **figure-of-eight fiber laser** for ultrashort pulse generation.",
        "Solved the nonlinear **Schr?dinger equation** with the **Split-Step Fourier Method (SSFM)** and modeled SMF, EDFA, NLF, NOLM, and NALM components.",
        "Studied how **cavity length**, gain, and saturation energy affect pulse dynamics and stability."
      ],
      stack: ["matlab", "fiberoptics", "ssfm", "photonics"],
      images: ["assets/project-fiberlaser-1.webp", "assets/project-fiberlaser-2.webp", "assets/project-fiberlaser-3.webp"],
      links: {
        report: "https://drive.google.com/file/d/1n50iuRQWp-SpdmBsvJo6CLMxY4H7jByF/view?usp=sharing"
      }
    }
  ],
  researchExperiences: [
    {
      id: "talan-research", period: "June-August 2026", organization: "Talan, Tunisia", mark: "T",
      role: "AI Intern", context: "AI and Intelligent Systems",
      bullets: [
        "Studied **world models** and JEPA, evaluating I-JEPA and V-JEPA 2 against MAE, BEiT, DINOv2, and CLIP.",
        "Ran diagnostics on **occlusion**, blur, embedding structure, and latent prediction.",
        "Built a platform with an encyclopedia, model advisor, and **arXiv research radar**."
      ],
      outcome: "Research support platform built with React, FastAPI, PostgreSQL, and Redis.",
      stack: ["react", "fastapi", "postgresql", "redis", "groq"]
    },
    {
      id: "sfm-internship", period: "July-August 2025", organization: "Groupe SFM, Tunisia", mark: "SFM",
      role: "Computer Vision Intern", context: "Face anti-spoofing and presentation attacks",
      bullets: [
        "Researched **presentation attacks** including printed photos, screen replays, videos, and 2D/3D masks.",
        "Developed a real-time **CNN-based anti-spoofing system** with OpenCV inference and liveness verification.",
        "Integrated live-webcam inference in a **GUI with secure login**.",
        "Implemented guided **multi-angle face registration** for enrollment."
      ],
      outcome: "Real-time anti-spoofing and guided capture project.",
      stack: ["python", "tensorflow", "keras", "opencv", "mediapipe"],
      projectId: "anti-spoofing"
    },
    {
      id: "tunilip-research", period: "October 2025-April 2026", organization: "Signals & Smart Systems Laboratory (L3S), ENIT", mark: "L3S",
      role: "TUNILip+ Research Project", context: "End-of-year project in sequence modeling and computer vision",
      bullets: [
        "Built and preprocessed a **Tunisian Arabic lip-reading corpus** for healthcare vocabulary.",
        "Benchmarked CNN-BiLSTM, MobileNetV2, VideoMAE, and a hybrid ensemble.",
        "Created a browser-based pipeline with real-time mouth detection and **dataset crowdsourcing**."
      ],
      outcome: "Browser-based lip-reading system and corpus expansion workflow.",
      stack: ["python", "tensorflowjs", "mediapipe", "keras", "cnn"],
      projectId: "tunilip"
    },
    {
      id: "fiber-laser-research", period: "October 2024-April 2025", organization: "ENIT", mark: "ENIT",
      role: "Optical Fiber Laser System Simulation", context: "Numerical simulation and nonlinear optics",
      bullets: [
        "Simulated a **figure-of-eight fiber laser** for ultrashort pulse generation.",
        "Applied the **Split-Step Fourier Method** to the nonlinear Schr?dinger equation with SMF, EDFA, NLF, NOLM, and NALM components.",
        "Investigated cavity length, gain, and saturation energy effects on **pulse dynamics and stability**."
      ],
      outcome: "Simulation of the laser cavity and its pulse dynamics.",
      stack: ["matlab", "fiberoptics", "ssfm", "photonics"],
      projectId: "fiber-laser"
    }
  ],
  volunteering: [
    {
      id: "student-branch-chair", title: "Student Branch Chair", organization: "IEEE ENIT Student Branch", period: "2025",
      description: "Led the IEEE ENIT Student Branch and coordinated its 300+ member community. Received the IEEE Tunisia Rising Star Member Award in 2025.",
      mark: "SB", gallery: [
        "assets/volunteering/student branch chair/2025 tunisia rising star award.webp",
        "assets/volunteering/student branch chair/1779720717539.webp",
        "assets/volunteering/student branch chair/community building.webp",
        "assets/volunteering/student branch chair/hackathons.webp",
        "assets/volunteering/student branch chair/team management.webp",
        "assets/volunteering/student branch chair/congresses organization.webp",
        "assets/volunteering/student branch chair/global celebrations.webp",
        "assets/volunteering/student branch chair/networking.webp",
        "assets/volunteering/student branch chair/creating memories.webp",
        "assets/volunteering/student branch chair/community and collaborations.webp",
        "assets/volunteering/student branch chair/congresses participations.webp",
        "assets/volunteering/student branch chair/contineous work.webp",
        "assets/volunteering/student branch chair/event management.webp",
        "assets/volunteering/student branch chair/leadership & tehnical knowledge.webp",
        "assets/volunteering/student branch chair/team.webp",
        "assets/volunteering/student branch chair/teamwork.webp"
      ],
      awardImage: "assets/volunteering/student branch chair/2025 tunisia rising star award.webp"
    },
    {
      id: "education-activities", title: "Educational Activities Committee Member", organization: "IEEE Tunisia Section", period: "March 2026-Present",
      description: "Contributed to IEEE Education Week activities and helped build its event website.", mark: "EA",
      link: { label: "IEEE Education Week website", url: "https://educationweek.ieee.tn/" },
      gallery: [
        "assets/volunteering/IEEE Education week in tunisia/20260419_180524.webp",
        "assets/volunteering/IEEE Education week in tunisia/IMG_0706.webp",
        "assets/volunteering/IEEE Education week in tunisia/img6.webp",
        "assets/volunteering/IEEE Education week in tunisia/img4.webp",
        "assets/volunteering/IEEE Education week in tunisia/img3.webp",
        "assets/volunteering/IEEE Education week in tunisia/eduweek.webp"
      ]
    },
    {
      id: "yp-taskforce", title: "Coordination Committee Chair", organization: "IEEE Young Professionals Tunisia Taskforce", period: "April 2026-Present",
      description: "Chair of the IEEE Young Professionals Tunisia Taskforce Coordination Committee.", mark: "YP",
      gallery: ["assets/volunteering/yp taskforce.webp"]
    },
    {
      id: "pes-communications", title: "Graphic Designer", organization: "IEEE PES Young Professionals Communications & Marketing Committee", period: "Ongoing",
      description: "Graphic designer on the IEEE PES Young Professionals Communications & Marketing Committee.", mark: "PES",
      gallery: ["assets/volunteering/pes yp designer.webp"]
    }
  ],
  skills: [
    { category: "LLMs & GenAI tooling", items: ["huggingface", "groq", "ollama", "llama", "gemma", "deepseek"] },
    { category: "Machine & Deep Learning", items: ["tensorflow", "pytorch", "scikitlearn", "keras", "cnn", "bilstm", "videomae"] },
    { category: "Python & Data Science", items: ["python", "numpy", "pandas", "jupyter", "matlab"] },
    { category: "Web & Apps", items: ["html5", "css3", "streamlit", "dotnet", "react", "fastapi", "wordpress", "nodejs", "angular", "tensorflowjs", "mediapipe"] },
    { category: "Databases", items: ["mysql", "postgresql", "sqlite", "redis", "mongodb"] },
    { category: "Dev Tools", items: ["git", "github", "docker", "linux", "bash", "latex"] },
    { category: "Embedded & Telecom", items: ["cplusplus", "arduino", "stm32", "fiberoptics", "ccna", "opencv", "mediapipe", "freertos", "uart", "webserial", "dsp", "opticalcommunications"] }
  ],
  designs: [
    "assets/designs/POSTER TSYP 13 .webp",
    "assets/designs/485898089_1048101110692327_2404153572932438269_n.webp",
    "assets/designs/492233517_1068337032002068_2838775980675150284_n.webp",
    "assets/designs/494562728_1095385182630586_3321887865605080359_n.webp",
    "assets/designs/500069582_1095442012624903_1000891890210675122_n (2).webp",
    "assets/designs/503624012_1117178630451241_4171152935176049241_n.webp",
    "assets/designs/518042117_1133640122138425_1200738394357905030_n.webp",
    "assets/designs/519616536_1136658565169914_2095269555227895463_n.webp",
    "assets/designs/555909112_781227664713118_2032147663336455005_n.webp",
    "assets/designs/558987293_1204346465067790_5293586699125285020_n.webp",
    "assets/designs/561420963_1212205237615246_1874385805985152293_n (2).webp",
    "assets/designs/565129549_1210157927819977_3525133409826569519_n.webp",
    "assets/designs/571166248_1218710806964689_3529427200314317431_n.webp",
    "assets/designs/571166248_1218710806964689_3529427200314317431_n (1).webp",
    "assets/designs/576995717_763255723402744_1680905632112763294_n.webp",
    "assets/designs/581913009_768213442906972_1541480868811685909_n.webp",
    "assets/designs/584085348_825652993603918_9143883394376423434_n.webp",
    "assets/designs/590053026_1247679564067813_8665891894666604670_n.webp",
    "assets/designs/626016391_1301798825322553_6198562768830062122_n.webp",
    "assets/designs/626296242_1303487451820357_1458523069978649627_n.webp",
    "assets/designs/657358579_122294789960217211_5974515410924691145_n.webp",
    "assets/designs/657636659_122294644028217211_4414930879649074946_n.webp",
    "assets/designs/677755817_122298842162217211_8422573063453076187_n.webp",
    "assets/designs/680151601_122299229084217211_1561958480890299484_n.webp"
  ]
};

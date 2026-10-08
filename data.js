/* Add projects, experiences, designs and certificates here. Gallery paths are relative to the site root. */
window.portfolioData = {
  projects: [
    {
      title: "AI Research Support Platform",
      eyebrow: "Talan - AI & Intelligent Systems Intern",
      period: "June-August 2026",
      description: "Studied world models and JEPA. Evaluated I-JEPA and V-JEPA 2 against MAE, BEiT, DINOv2 and CLIP, including robustness experiments. Built a research support platform with an interactive encyclopedia, model advisor and research radar.",
      tags: ["World Models", "JEPA", "React", "FastAPI", "PostgreSQL", "Redis"],
      images: ["assets/talan summer/talan 1.webp", "assets/talan summer/encyclopedia.webp", "assets/talan summer/dash.webp", "assets/talan summer/paper.webp", "assets/talan summer/paper dashboard.webp"],
      links: []
    },
    {
      title: "E-LearNIT (The One)",
      eyebrow: "IEEE Region 8 Humanitarian Technologies Competition",
      period: "November 2025-January 2026",
      description: "Contributed to an AI platform for Tunisian Sign Language recognition and text-to-speech, including a community-validated TSL dataset. Supported demonstrations, deployment and coordination. The team placed second in the IEEE Region 8 (Europe, Middle East and North Africa) competition.",
      tags: ["AI", "Tunisian Sign Language", "Accessibility", "Dataset"],
      images: ["assets/region 8 humanitarian technologies competition/1774718961080.webp", "assets/region 8 humanitarian technologies competition/1774718962024.webp", "assets/region 8 humanitarian technologies competition/1785353097311.webp"],
      links: []
    },
    {
      title: "TUNILip+", eyebrow: "Academic project - Lip-reading",
      description: "End-of-year project building an automated lip-reading system for Tunisian Arabic from scratch - no prior dataset or benchmark existed. Built a custom dataset from 50+ volunteer speakers, then compared four modeling approaches (CNN-BiLSTM, MobileNetV2 transfer learning, VideoMAE fine-tuning, and a hybrid ensemble). Deployed fully client-side in the browser via TensorFlow.js, with no video ever leaving the device.",
      tags: ["Python", "TensorFlow.js", "MediaPipe", "CNN", "BiLSTM", "VideoMAE"],
      images: ["assets/project-tunilip-1.webp", "assets/project-tunilip-2.webp", "assets/project-tunilip-3.webp"],
      links: [{ label: "GitHub", url: "https://github.com/yosr580/TUNILip-.git" }, { label: "Report", url: "https://drive.google.com/file/d/1dlTboWWM9z6d0yeZWBFFMc_t921f33ER/view?usp=sharing" }], notes: ["Live demo unavailable"]
    },
    {
      title: "Anti-Spoofing Module for Facial Recognition", eyebrow: "Computer vision - Groupe SFM internship",
      period: "July-August 2025",
      description: "Built during a Computer Vision internship at Groupe SFM. Designed and trained a CNN-based binary classifier (Real vs. Spoof) in Keras/TensorFlow to detect presentation attacks (printed photos, screen replay, masks) against real-time facial recognition. Deployed within a full GUI with live webcam feed, secure login/logout, and a guided multi-angle registration flow resistant to spoofing at enrollment.",
      tags: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN"],
      images: ["assets/project-antispoofing-1.webp", "assets/project-antispoofing-2.webp", "assets/project-antispoofing-3.webp"],
      links: [{ label: "GitHub", url: "https://github.com/yosr580/Face-anti-spoofing-module-.git" }, { label: "Report", url: "https://drive.google.com/file/d/1SxT4gTt9WsqTBHzb-FCmWP3sCD4qwlVr/view?usp=sharing" }]
    },
    {
      title: "Intelligent Video Surveillance", eyebrow: "Computer vision - Embedded systems",
      description: "Team project combining an ArduCam camera with a Python facial recognition pipeline. The system captures real-time video, detects unknown faces, sends automatic email alerts with the captured image, and generates a PDF attendance report.",
      tags: ["Python", "OpenCV", "face_recognition", "Arduino", "SMTP", "ReportLab"],
      images: ["assets/project-surveillance-1.webp", "assets/project-surveillance-2.webp", "assets/project-surveillance-3.webp"], links: [], notes: ["GitHub unavailable"]
    },
    {
      title: "Figure-of-Eight Fiber Laser", eyebrow: "Optical communications - Research",
      description: "Simulation and modeling of a figure-of-eight fiber laser architecture known for producing stable ultrashort pulses. Modeled the system using the nonlinear Schrodinger equation and implemented the Split-Step Fourier Method (SSFM) to analyze pulse evolution within the cavity.",
      tags: ["MATLAB", "Photonics", "Fiber optics", "Optical communications"],
      images: ["assets/project-fiberlaser-1.webp", "assets/project-fiberlaser-2.webp", "assets/project-fiberlaser-3.webp"],
      links: [{ label: "Report", url: "https://drive.google.com/file/d/1n50iuRQWp-SpdmBsvJo6CLMxY4H7jByF/view?usp=sharing" }]
    }
  ],
  experiences: [
    {
      id: "student-branch-chair", title: "Student Branch Chair", organization: "IEEE ENIT Student Branch", period: "2025",
      description: "Led the student branch and its 300+ member community. Received the IEEE Tunisia Rising Star Member Award in 2025.",
      gallery: [
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
      ], featuredGallery: true
    },
    {
      id: "education-activities", title: "Educational Activities Committee Member", organization: "IEEE Tunisia Section", period: "March 2026-Present",
      description: "Contributed to IEEE Education Week activities with the IEEE Tunisia Section and built the Education Week event website.",
      link: { label: "IEEE ENIT Education Week website", url: "https://educationweek.ieee.tn/" },
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
      description: "Chair of the YP Taskforce Coordination Committee.", gallery: ["assets/volunteering/yp taskforce.webp"]
    },
    {
      id: "pes-communications", title: "Graphic Designer", organization: "IEEE PES Young Professionals Communications & Marketing Committee", period: "Ongoing",
      description: "Graphic designer on the Communications & Marketing Committee.", gallery: ["assets/volunteering/pes yp designer.webp"]
    }
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
  ],
  certificates: [] // Add { title, issuer, date, image, url } objects here when ready.
};

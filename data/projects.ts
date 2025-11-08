export interface Project {
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  technologies: string[]
  githubUrl?: string
  image: string
  course?: string
  institution?: string
  year?: string
  pageDescription?: string
  objective?: string
  dataset?: {
    name: string
    description: string
    configurations?: string[]
  }
  architectures?: Array<{
    name: string
    description: string
    details?: string[]
  }>
  technicalImplementation?: {
    dataPreprocessing?: string[]
    dataAugmentation?: string[]
    trainingDetails?: string[]
    modelEvaluation?: string[]
    otherSections?: string[]
  }
  designAndAnalysisMethodology?: {
    designApproach?: string[]
    componentSelection?: string[]
    stressAndFatigueAnalysis?: string[]
    deflectionAndSlope?: string[]
    simulationAndValidation?: string[]
  }
  keyFeaturesAndFunctionalities?: Array<{
    title: string
    items: string[]
  }>
  systemDesign?: Array<{
    title: string
    items: string[]
  }>
  performanceAndResults?: {
    metrics?: string[]
    videos?: Array<{
      src: string
      alt: string
      title?: string
    }>
  }
  keyAchievements?: string[]
  results?: {
    baselineAccuracy?: string
    validationAccuracy?: string
    testAccuracy?: string
    epochs?: number
    otherMetrics?: Array<{ label: string; value: string }>
  }
  images?: Array<{
    src: string
    alt: string
    caption?: string
  }>
  photos?: Array<{
    src: string
    alt: string
    caption?: string
  }>
  cadModels?: Array<{
    src: string
    alt: string
    caption?: string
    model3d?: string // Path to 3D model file (glTF/GLB format)
  }>
  videos?: Array<{
    src: string
    title: string
    description?: string
    thumbnail?: string
    type?: 'simulation' | 'operation' | 'other'
    skills?: string[]
    projectDescription?: string
  }>
}

export const projectsData: Project[] = [
  {
    slug: 'meam5100-autonomous-robot',
    title: 'Autonomous Competition Robot',
    shortDescription:
      'Designed and built an autonomous robot for competitive gameplay, integrating mechanical, electrical, and software systems. The robot autonomously identifies, transports, and positions scoring objects using infrared beacon tracking, Vive localization, wall-following, and PID motor control.',
    fullDescription:
      'This project involved designing and building an autonomous robot capable of detecting and manipulating multiple objects in a dynamic competition field. The robot used infrared sensors to distinguish real and fake trophies, Vive tracking for global localization, and time-of-flight sensors for wall following and obstacle avoidance. A PID-controlled differential drive enabled smooth navigation, while wireless communication via ESP-NOW and UDP ensured real-time updates. Through iterative mechanical, electrical, and software integration, the system achieved reliable autonomous operation and demonstrated strong performance in completing all major game objectives.',
    technologies: [
      'ESP32',
      'Arduino',
      'C/C++',
      'Embedded Systems',
      'PID Control',
      'Motor Control',
      'Sensor Integration',
      'Infrared Sensors',
      'Time-of-Flight Sensors',
      'Vive Tracking',
      'ESP-NOW',
      'UDP',
      'I2C',
      'SPI',
      'UART',
      'Real-Time Systems',
      'Autonomous Navigation',
      'SolidWorks',
      'Circuit Design',
      'Op-Amps',
      'Filters',
      'ADC',
    ],
    image: '/images/projects/meam5100-autonomous-robot/project-background.jpg',
    course: 'MEAM 5100 - Design of Mechatronic Systems',
    institution: 'University of Pennsylvania',
    year: 'Fall 2023',
    githubUrl: 'https://github.com/NayrChiang/autonomous-competition-robot',
    objective:
      'Design and build an autonomous robot capable of identifying, transporting, and positioning objects on a competition field to maximize scoring potential while operating fully autonomously and handling opponent interference',
    keyFeaturesAndFunctionalities: [
      {
        title: 'Game Strategy',
        items: [
          'Autonomous detection and manipulation of real vs. fake trophies via IR frequency recognition (550 Hz vs 23 Hz).',
          'Real-time navigation using Vive tracking and Time-of-Flight sensors.',
          'Decision-making hierarchy prioritizing high-value tasks like trophy retrieval and police car pushing.',
          'Adaptive recovery mechanisms for handling sensor or movement errors.',
        ],
      },
      {
        title: 'Autonomous Navigation',
        items: [
          'PID-based motor control for smooth acceleration/deceleration.',
          'Wall-following using dual TOF sensors for edge alignment and obstacle avoidance.',
          'Real-time localization with Vive tracking and feedback-controlled path correction.',
        ],
      },
      {
        title: 'Object Manipulation',
        items: [
          'Servo-actuated gripper for trophy handling.',
          'Controlled pushing of the police car based on real-time Vive position updates.',
          'Frequency-based classification for distinguishing object types.',
        ],
      },
      {
        title: 'Wireless Communication',
        items: [
          'ESP-NOW + UDP networking for position broadcasting and communication multiplier compliance.',
          'Fail-safe message retransmission mechanisms for reliability in high-interference environments.',
        ],
      },
    ],
    systemDesign: [
      {
        title: 'Mechanical',
        items: [
          'Differential drive system (replacing Mecanum wheels) for improved traction.',
          'Two-layer chassis design for weight distribution and stability.',
          'Custom mounts for sensors and electronics.',
        ],
      },
      {
        title: 'Electrical',
        items: [
          'ESP32-WROOM microcontroller with modularized sensor architecture.',
          'Dual-voltage power regulation (14.8 V LiPo → 12 V & 5 V).',
          'Two-stage IR amplifier circuit for robust signal detection.',
        ],
      },
      {
        title: 'Software',
        items: [
          'Modular state-machine architecture controlling modes (wall-following, beacon tracking, manual debug).',
          'PID motor control with encoder feedback.',
          'Web-based control interface for debugging.',
        ],
      },
    ],
    photos: [
      {
        src: '/images/projects/meam5100-autonomous-robot/robot-photo.jpg',
        alt: 'Autonomous Competition Robot',
        caption: 'Complete robot system with integrated sensors, actuators, and electronics',
      },
    ],
    cadModels: [
      {
        src: '/images/projects/meam5100-autonomous-robot/cad-model.png',
        alt: 'CAD Model - Robot Assembly',
        caption: 'SolidWorks CAD model showing two-layer chassis design and component layout',
      },
    ],
    performanceAndResults: {
      metrics: [
        'Success rate: ~80% completion of all game objectives during trials.',
        'Trophy detection range: Up to 2.5 m with < 0.5 s response.',
        'Wall-following accuracy: < 5 cm lateral deviation.',
      ],
      videos: [
        {
          src: '/videos/projects/meam5100-autonomous-robot/MEAM 5100 Final Project - Beacon Tracking.mp4',
          alt: 'MEAM 5100 Robot - Beacon Tracking',
          title: 'Beacon Tracking',
        },
        {
          src: '/videos/projects/meam5100-autonomous-robot/MEAM 5100 Final Project - Police Car Tracking via Vive.mp4',
          alt: 'MEAM 5100 Robot - Police Car Tracking via Vive',
          title: 'Police Car Tracking via Vive',
        },
        {
          src: '/videos/projects/meam5100-autonomous-robot/MEAM 5100 Final Project - Wall Following.mp4',
          alt: 'MEAM 5100 Robot - Wall Following',
          title: 'Wall Following',
        },
      ],
    },
    keyAchievements: [
      'Integrated mechanical, electrical, and software systems into a fully autonomous robot.',
      'Achieved ~80% success rate in completing all game objectives during trials.',
      'Implemented IR frequency detection (550 Hz vs 23 Hz) with < 0.5 s response time.',
      'Developed PID-controlled differential drive with < 5 cm wall-following accuracy.',
      'Integrated Vive tracking for real-time global localization and path correction.',
      'Designed modular state-machine architecture supporting multiple operational modes.',
      'Created dual-voltage power regulation (14.8 V LiPo → 12 V & 5 V).',
      'Built two-layer chassis for optimal weight distribution and stability.',
    ],
  },
  {
    slug: 'barcelona-logo-projection',
    title: 'Computer Vision Mini Projects',
    shortDescription:
      'Mini projects from CIS5800 Computer Vision demonstrating homography estimation for logo projection and camera pose estimation (PnP/P3P) for augmented reality applications. Each project includes demonstration videos with detailed technical descriptions.',
    fullDescription:
      'This project demonstrates practical implementation of homography estimation and inverse warping techniques in computer vision. Using projective geometry, I computed 3×3 homography matrices from 4 point correspondences to map the Penn Engineering logo onto a soccer goal in video frames. The implementation uses SVD-based homography estimation and inverse warping to avoid pixel holes and rounding errors, ensuring smooth and perspective-preserving logo projection.',
    technologies: [
      'Python',
      'OpenCV',
      'NumPy',
      'Projective Geometry',
      'Homography Estimation',
      'Image Warping',
      'SVD',
      'PnP Problem',
      'P3P Problem',
      'Procrustes',
      'Camera Pose Estimation',
      '3D Rendering',
      'Computer Vision',
    ],
    image: '/images/projects/barcelona-logo-projection/project-background.png',
    githubUrl: 'https://github.com/NayrChiang/computer-vision-mini-projects',
    course: 'CIS5800 - Computer Vision',
    institution: 'University of Pennsylvania',
    year: 'Fall 2024',
    pageDescription:
      'This page showcases mini projects from CIS5800 Computer Vision course, demonstrating practical implementations of core computer vision techniques. Projects include homography estimation and image warping for logo projection, as well as camera pose estimation (PnP and P3P) for augmented reality applications. Each project includes a demonstration video with detailed technical descriptions.',
    designAndAnalysisMethodology: {
      designApproach: [
        'Computed homography matrix H using SVD from 4 point correspondences between goal corners and logo corners.',
        'Applied Direct Linear Transform (DLT) algorithm to solve for the 3×3 homography matrix.',
        'Used inverse warping (video → logo mapping) to ensure every video pixel has a corresponding logo pixel, avoiding holes and rounding errors.',
        'Normalized homogeneous coordinates by dividing by the third component (λ) after transformation.',
      ],
      componentSelection: [
        'Implemented est_homography() function to compute homography matrix from point correspondences.',
        'Built 2n×9 matrix A from point correspondences, where each correspondence provides 2 linear equations.',
        'Used SVD decomposition to find the null space vector, which gives the homography matrix.',
        'Normalized the homography matrix by dividing by H[2,2] to ensure proper scaling.',
      ],
      stressAndFatigueAnalysis: [
        'Implemented warp_pts() function to transform interior points using the computed homography.',
        'Applied homogeneous coordinate transformation: x\' = Hx for each point.',
        'Normalized transformed points by dividing x and y coordinates by the third component (λ).',
        'Processed all interior points within the goal region for each of the 129 video frames.',
      ],
      simulationAndValidation: [
        'Validated homography estimation on test cases with known correspondences.',
        'Verified inverse warping produces smooth, artifact-free logo projection.',
        'Processed complete video sequence of 129 frames with consistent results.',
        'Generated 2x speed-accelerated output video for demonstration.',
      ],
    },
    keyAchievements: [
      'Successfully implemented homography estimation using SVD-based DLT algorithm for logo projection across 129 video frames.',
      'Applied inverse warping technique to avoid pixel holes and rounding errors, ensuring smooth perspective-preserving transformations.',
      'Implemented two camera pose estimation methods: PnP with coplanar assumption and P3P with Procrustes problem solving.',
      'Recovered 3D camera-world relationships to render virtual objects (drill and fuze models) into real-world scenes across 93 frames.',
      'Demonstrated understanding of projective geometry, homogeneous coordinates, and 3D-2D correspondence problems.',
      'Created augmented reality applications with accurate perspective and lighting, enabling virtual object placement in real scenes.',
    ],
    results: {
      otherMetrics: [
        { label: 'Video Frames', value: '129 frames' },
        { label: 'Video Resolution', value: '1280×720' },
        { label: 'Output FPS', value: '60 fps (2x speed)' },
        { label: 'Homography Method', value: 'SVD-based DLT' },
        { label: 'Point Correspondences', value: '4 corners' },
        { label: 'Warping Method', value: 'Inverse warping' },
      ],
    },
    images: [
      {
        src: '/images/projects/barcelona-logo-projection/project-background.png',
        alt: 'Upenn Logo Projection Sample Frame',
        caption: 'Sample frame showing Penn Engineering logo projected onto the soccer goal with proper perspective',
      },
    ],
    videos: [
      {
        src: '/videos/projects/barcelona-logo-projection/barcelona_logo_projection_1_5x.gif',
        title: 'Upenn Logo Projection',
        description: 'The UPenn Engineering logo is projected onto a soccer goal across 129 frames using homography estimation and inverse warping techniques.',
        type: 'operation',
        skills: ['Homography Estimation', 'SVD', 'Inverse Warping', 'Projective Geometry'],
        projectDescription: 'Implemented homography estimation using SVD-based DLT algorithm to compute a 3×3 transformation matrix from 4 point correspondences. Applied inverse warping to project the UPenn Engineering logo onto a soccer goal across 129 frames, maintaining proper perspective while avoiding pixel artifacts.',
      },
      {
        src: '/videos/projects/barcelona-logo-projection/ar_april_tags.gif',
        title: 'Augmented Reality with AprilTags',
        description: 'Implemented camera pose estimation using two methods: PnP (Perspective-n-Point) with coplanar assumption via homography, and P3P (Perspective-3-Point) with Procrustes problem solving. Recovered 3D camera-world relationship to render virtual objects (drill and fuze models) into real-world scenes across 93 video frames with accurate perspective and lighting.',
        type: 'operation',
        skills: ['PnP Problem', 'P3P Problem', 'Procrustes', 'Camera Pose Estimation', '3D Rendering'],
      },
    ],
  },
  
  {
    slug: 'autonomous-maze-robot',
    title: 'Autonomous Maze Navigation Robot',
    shortDescription:
      'Designed and implemented an autonomous robot system capable of navigating a maze, localizing its position, detecting blocks, and autonomously picking up and delivering blocks to designated zones. Integrated multiple sensors, motor control systems, and probability-based localization algorithms.',
    fullDescription: `An autonomous robot system for maze navigation and block manipulation in a 32x16 grid environment. The system integrates 9 sensors (7 ultrasonic + 2 IR) with MATLAB-Arduino control via Bluetooth, using probability-based localization (Monte Carlo) for real-time position tracking. Successfully demonstrated perfect obstacle avoidance, accurate localization, and reliable block detection.`,
    githubUrl: 'https://github.com/NayrChiang/autonomous-maze-robot',
    technologies: [
      'Arduino',
      'C/C++',
      'MATLAB',
      'Sensor Integration',
      'Motor Control',
      'Robot Localization',
      'Bluetooth Communication',
      'Real-time Systems',
      'Embedded Systems',
    ],
    image: '/images/projects/autonomous-maze-robot/photos/project-background.jpeg',
    course: 'MIE444 - Mechatronics',
    institution: 'University of Toronto',
    year: 'Fall 2022',
    objective:
      'Design and implement an autonomous robot system capable of navigating a maze, localizing its position using probability-based algorithms, detecting blocks, and autonomously picking up and delivering blocks to designated zones.',
    technicalImplementation: {
      dataPreprocessing: [
        'Multi-sensor data fusion: 7 ultrasonic sensors (front, left, right, back, 45° angles) and 2 IR sensors',
        'Ultrasonic sensor averaging (5 samples per reading) for noise reduction',
        'IR sensor calibration for floor pattern recognition and block detection',
        'Real-time data acquisition via Bluetooth serial communication at 9600 baud',
        'Distance calculation: ultrasonic ping time to distance conversion (0.017 cm/μs)',
        'Sensor threshold calibration: Measurements taken at various maze locations to establish wall distance thresholds',
      ],
      trainingDetails: [
        'Arduino firmware: Separate programs for sensors and motor/servo control',
        'MATLAB control algorithms: Navigation, localization, path planning, obstacle avoidance',
        'SimMer simulation: Proof of concept testing with lower sensor error settings before real robot implementation',
        'Probability-based localization: Monte Carlo method with 32x16 grid probability distribution, 10% threshold for path switching',
        'Fixed path planning: Pre-defined routes for 32 block locations with loading/unloading sequences',
        'Angle correction logic: Comparison of current and previous step side sensor readings to maintain straight path',
        'Bluetooth communication: HC-05 module for wireless MATLAB-Arduino data exchange',
        'Motor control: H-bridge control for DC motors, PWM speed control (analogWrite)',
        'Servo control: 3D-printed gripper with two SG90 servos',
        'Obstacle avoidance: Wall distance thresholds',
        'Block detection: Scanning the field with an ultrasonic sensor',
      ],
      modelEvaluation: [
        'Real-time position tracking: Probability distribution visualization and maximum probability tracking',
        'Localization accuracy: Threshold-based path switching (probability > 10%)',
        'Obstacle avoidance: Perfect collision-free navigation, though speed was slow due to accuracy trade-off',
        'Block detection: Successfully identified load location using scanning sequence',
        'Block manipulation: Detection logic functional, but pickup/delivery failed due to gripper design limitations (insufficient torque, weak connection)',
        'Navigation performance: Successfully navigated from block 30 to loading zone',
        'Integration challenges: Code organization issues and incomplete integration of load detection/pickup with full sequence',
      ],
    },
    keyAchievements: [
      'Successfully integrated 9 sensors (7 ultrasonic + 2 IR) with multi-sample averaging for robust environment sensing',
      'Implemented probability-based localization algorithm (Monte Carlo) for real-time position tracking in 32x16 grid maze with 10% probability threshold',
      'Developed autonomous navigation system with perfect obstacle avoidance (collision-free navigation)',
      'Achieved reliable block detection using ultrasonic sensor scanning sequence (90-100° rotation in 5° increments)',
      'Integrated MATLAB-Arduino system via Bluetooth (HC-05) for real-time control and data acquisition, simplifying testing and troubleshooting',
      'Implemented fixed path planning system for 32 block locations with configurable loading/unloading sequences',
      'Designed angle correction logic to maintain straight path travel, critical for accurate localization',
      'Successfully demonstrated localization and navigation: demonstration showed rover navigating from block 30 to loading zone',
      'Designed and fabricated complete robot chassis with integrated sensor mounts and actuator assemblies using SolidWorks CAD',
      'Redesigned rover from 9-inch to 6.5-inch diameter (top layer) to improve sensor accuracy and obstacle avoidance performance',
    ],
    results: {
      otherMetrics: [
        { label: 'Maze Environment', value: '32x16 grid (512 cells)' },
        { label: 'Sensors Integrated', value: '9 sensors (7 ultrasonic + 2 IR)' },
        { label: 'Localization Method', value: 'Probability-based (Monte Carlo, 10% threshold)' },
        { label: 'Block Locations', value: '32 predefined positions' },
        { label: 'Communication', value: 'Bluetooth (HC-05, 9600 baud)' },
        { label: 'Control System', value: 'MATLAB-Arduino Integration' },
        { label: 'Actuators', value: '2 DC motors, 2 SG90 servo motors' },
        { label: 'Obstacle Avoidance', value: 'Perfect (collision-free navigation)' },
        { label: 'Localization Performance', value: 'Successful (demonstration: block 30 to loading zone)' },
        { label: 'Block Detection', value: 'Functional (successful load identification)' },
        { label: 'Block Manipulation', value: 'Limited (gripper design constraints)' },
      ],
    },
    images: [
      {
        src: '/images/projects/autonomous-maze-robot/robot-system.png',
        alt: 'Autonomous Robot System',
        caption: 'Complete robot system with sensors and actuators',
      },
      {
        src: '/images/projects/autonomous-maze-robot/maze-navigation.png',
        alt: 'Maze Navigation',
        caption: 'Robot navigating through the maze environment',
      },
      {
        src: '/images/projects/autonomous-maze-robot/block-manipulation.png',
        alt: 'Block Manipulation',
        caption: 'Block detection and manipulation system',
      },
    ],
    photos: [
      {
        src: '/images/projects/autonomous-maze-robot/photos/rover-photo.jpeg',
        alt: 'Autonomous Maze Navigation Robot',
        caption: 'Complete robot system with integrated sensors and actuators',
      },
    ],
    cadModels: [
      {
        src: '/images/projects/autonomous-maze-robot/cad-models/rover-model-screenshot.png',
        alt: 'CAD Model - Robot Assembly',
        caption: 'SolidWorks CAD model of the robot chassis and sensor assembly',
        // To use 3D model, uncomment and add path to your GLB/glTF file:
        // model3d: '/models/autonomous-maze-robot/rover-model.glb',
      },
    ],
    videos: [
      {
        src: '/videos/projects/autonomous-maze-robot/matlab_simulation.mp4',
        title: 'SimMer Simulation - Obstacle Avoidance & Navigation',
        description: 'MATLAB-based simulation demonstrating the robot\'s obstacle avoidance algorithms and navigation strategies. The simulation validates the angle correction logic and path-following behavior before real-world implementation.',
        type: 'simulation',
      },
      {
        src: '/videos/projects/autonomous-maze-robot/actual-demonstration.mp4',
        title: 'Real-World Operation',
        description: 'Complete autonomous operation demonstration in the actual 32x16 grid maze. Shows successful localization from block 30, navigation to loading zone, and block detection using ultrasonic sensor scanning sequence.',
        type: 'operation',
      },
    ],
  },

  {
    slug: 'mie346-design-assignments',
    title: 'Portable Oscilloscope',
    shortDescription:
      'Designed and prototyped a portable, low-cost oscilloscope for measuring analog signals with multiple input ranges. The system integrates voltage scaling, AC/DC coupling, active low-pass filtering, and dual-rail power management, developed from concept to PCB fabrication using PSPICE and EAGLE.',
    fullDescription:
      'Designed and prototyped a portable, low-cost oscilloscope capable of measuring analog signals up to 20 kHz with ±5 V (1X) and ±50 V (10X) input ranges. The system integrates voltage scaling, AC/DC coupling, low-pass filtering, and dual-rail power management, representing the full electronics design workflow — from circuit conception and simulation to PCB fabrication readiness. Simulated and validated circuit performance in PSPICE, then implemented the final design in EAGLE for PCB fabrication.',
    technologies: [
      'PSPICE',
      'EAGLE',
      'MATLAB',
      'Analog Circuit Design',
      'PCB Layout',
      'Signal Conditioning',
      'Power Electronics',
      'Op-Amp Circuits',
      'Active Filters',
      'Voltage Regulation',
    ],
    image: '/images/projects/mie346-design-assignments/pcb-schematic.jpg',
    course: 'MIE346 - Circuits and Electronics for Mechatronics',
    institution: 'University of Toronto',
    year: 'Spring 2021',
    objective:
      'Design and prototype a portable oscilloscope with ±5 V (1X) and ±50 V (10X) input ranges, ≥1 MΩ input impedance, switchable AC/DC coupling, and 20 kHz bandwidth, demonstrating full electronics design pipeline from analog modeling to PCB-ready implementation.',
    designAndAnalysisMethodology: {
      designApproach: [
        'Defined engineering requirements for a handheld oscilloscope: ±5 V range, ≥1 MΩ input impedance, switchable AC/DC coupling, 20 kHz bandwidth.',
        'Developed two candidate front-end circuits integrating voltage dividers, coupling networks, and op-amp buffering (TL084).',
        'Simulated signal behavior in PSPICE to verify gain linearity, frequency response, and coupling characteristics.',
        'Selected optimal topology based on signal fidelity and ease of PCB routing.',
      ],
      componentSelection: [
        'Implemented the final schematic in Autodesk EAGLE (v7.7) and produced a compact 2-layer PCB layout (1.5″ × 2.5″).',
        'Created a Bill of Materials (BOM) with Digikey sourcing for all components (resistors, capacitors, TL084 op-amp, BNC connector).',
        'Used SMD 0603 packages for passives to minimize footprint and trace inductance; kept connectors through-hole for structural reliability.',
        'Optimized trace routing for low noise — separated analog ground from digital reference and minimized loop areas.',
      ],
      stressAndFatigueAnalysis: [
        'Added an active low-pass filter (anti-aliasing) stage designed via Analog Devices Filter Wizard, targeting 20 kHz cutoff with <1 dB passband ripple.',
        'Integrated input and ADC protection circuits using diode clamping and series resistors to prevent overvoltage and ESD damage.',
        'Verified frequency response through PSPICE simulation; achieved > 40 dB attenuation beyond cutoff.',
      ],
      simulationAndValidation: [
        'Designed a dual-rail (+9 V / –9 V) power subsystem fed by a 12 V DC wall adapter.',
        'Integrated decoupling capacitors and regulators to stabilize op-amp supply and minimize ripple.',
        'Ensured safe USB interface operation via current-limiting circuits and reverse-polarity protection.',
        'Revised PCB layout for efficient grounding and shorter high-current return paths.',
      ],
    },
    keyAchievements: [
      'Designed complete portable oscilloscope system with ±5 V (1X) and ±50 V (10X) input ranges, ≥1 MΩ input impedance, and 20 kHz bandwidth',
      'Achieved stable input conditioning circuit maintaining ±1% linearity and correct DC biasing across AC/DC coupling modes',
      'Produced clean, manufacturable PCB layout (1.5″ × 2.5″) with low parasitic coupling and defined test points',
      'Implemented active low-pass filter with > 40 dB attenuation beyond 20 kHz cutoff, improving signal quality and reducing high-frequency noise',
      'Designed fully functional dual-rail power delivery architecture (+9 V / –9 V) with voltage ripple < 50 mV, supporting stable analog performance',
      'Demonstrated full electronic design pipeline from analog modeling and simulation to PCB-ready implementation',
      'Developed practical skills in circuit debugging, layout optimization, and power integrity',
    ],
    results: {
      otherMetrics: [
        { label: 'Dual input modes', value: '±5 V (1X) and ±50 V (10X)' },
        { label: 'Switchable AC/DC coupling', value: 'for signal flexibility' },
        { label: 'Active low-pass filter', value: '20 kHz cutoff, <1 dB ripple' },
        { label: 'TL084 op-amp', value: 'for high input impedance and low noise' },
        { label: 'Dual-rail power supply', value: '+9 V / –9 V from 12 V adapter' },
        { label: 'Diode-based protection', value: 'for input and ADC safety' },
        { label: 'Compact 2-layer PCB', value: '1.5″ × 2.5″ with SMD components' },
      ],
    },
    images: [
      {
        src: '/images/projects/mie346-design-assignments/pcb-schematic.jpg',
        alt: 'PCB Schematic',
        caption: 'Complete PCB layout showing 2-layer design with optimized trace routing for low noise',
      },
      {
        src: '/images/projects/mie346-design-assignments/eagle-schematic.jpg',
        alt: 'Eagle Schematic',
        caption: 'EAGLE schematic with voltage dividers, coupling networks, and TL084 op-amp buffering',
      },
    ],
  },

  {
    slug: 'additive-friction-stir-deposition',
    title: 'Additive Friction Stir Deposition',
    shortDescription:
      'Investigated AFSD as a solid-state metal additive manufacturing process. Compared to fusion-based methods (TIG welding) and beam-based AM (SLM, EBM) in mechanical strength, microstructure, and scalability.',
    fullDescription: `Investigated Additive Friction Stir Deposition (AFSD) as a solid-state metal additive manufacturing process. Operating below the melting point, AFSD eliminates porosity and cracking, producing fully dense parts with refined grains and superior strength. Quantified performance metrics—build rate: 1000 cm³/hr (Al 6061), build volume: 4 × 2.7 × 1 m, and yield strength gains: +49% (Inconel 625), +20% (Ti-6Al-4V)—demonstrating AFSD's scalability and reliability for aerospace and heavy-equipment repair.`,
    technologies: [
      'Additive Manufacturing',
      'Solid-State Processing',
      'Friction Stir',
      'Materials Science',
      'Mechanical Testing',
      'Microstructure Characterization',
      'Process Optimization',
      'Finite Element Analysis',
    ],
    image: '/images/projects/additive-friction-stir-deposition/additive friction stir deposition.png',
    course: 'MIE519 – Advanced Manufacturing Technologies',
    institution: 'University of Toronto',
    year: 'Spring 2023',
    objective:
      'Investigate AFSD as a next-generation method for repairing and rebuilding metallic components, comparing its performance to conventional fusion-based methods and beam-based AM processes in terms of mechanical strength, microstructure, and scalability.',
    technicalImplementation: {
      dataPreprocessing: [
        'Process Overview & Methodology: Described AFSD solid-state deposition mechanism using rotating hollow tooling that heats feed material to plastic range through friction',
        'Process flow: Tool rotation generates frictional heat below melting temperature, depositing layers typically several hundred microns thick',
        'Setup: Analyzed commercial AFSD machine capabilities including 3-5 axis CNC milling integration for post-processing',
        'Build process: Near-net shape production through layer-by-layer deposition, followed by subtractive manufacturing for fine details',
      ],
      dataAugmentation: [
        'Material Selection & Process Parameters: Compared multiple alloy families including Inconel 625, Ti-6Al-4V, Al 6061, and AZ31 Mg',
        'Tooling parameters: Investigated rotational speed (RPM), feed rate (mm/min), and axial force effects on material deposition',
        'Process optimization: Analyzed parameter effects on defect formation (weak/kiss bonding, voids, cavities, cracks, tunnels)',
        'Temperature control: Solid-state process operates below melting point, eliminating fusion-related defects',
      ],
      trainingDetails: [
        'Experimental Design & Comparative Analysis: Benchmarked AFSD performance against conventional fusion-based methods (TIG welding)',
        'AM process comparison: Quantitative analysis of AFSD vs. Selective Laser Melting (SLM) and Electron Beam Melting (EBM)',
        'Performance metrics: Systematic comparison of yield strength, tensile strength, and elongation at break across processes',
        'Build rate analysis: AFSD demonstrated >4× faster build rates compared to powder bed fusion (PBF) and direct energy deposition (DED)',
        'Build volume evaluation: Analyzed AFSD open-air capability allowing large parts (up to 4 × 2.7 × 1 m) vs. chamber-limited AM processes',
      ],
      modelEvaluation: [
        'Microstructural & Mechanical Evaluation: Analyzed grain refinement through microscopy data comparing base materials vs. AFSD-processed materials',
        'Grain structure correlation: Identified relationship between refined grain structure and improved yield strength and ductility',
        'Mechanical property analysis: Quantified yield strength improvements (+49% for Inconel 625, +20% for Ti-6Al-4V) compared to base materials',
        'Strength comparison: AFSD-processed Inconel 625 showed 2× higher yield strength than SLM-processed material',
        'Defect analysis: Verified minimal porosity, residual stress, and cracking in solid-state AFSD builds compared to fusion-based processes',
        'Elongation evaluation: Analyzed relationship between strength improvements and ductility changes across different materials',
      ],
      otherSections: [
        'Post-Processing & Validation: Analyzed CNC machining requirements for removing material overflow and achieving fine details',
        'Defect inspection: Evaluated methods for detecting and eliminating defects such as weak bonding, voids, and tunnels',
        'Heat treatment: Investigated post-processing heat treatment requirements for achieving higher strength when needed',
        'Verification methods: Validated mechanical properties through tensile testing, microstructure analysis, and defect inspection',
        'Quality assurance: Compared defect levels in AFSD builds (minimal) vs. fusion-based processes (porosity, cracking, columnar microstructures)',
      ],
    },
    keyAchievements: [
      'Demonstrated 49% yield strength increase (Inconel 625) and 20% improvement (Ti-6Al-4V) compared to base materials',
      'Showed AFSD build rate > 4x faster than powder-based AM (PBF/DED)',
      'Verified minimal porosity, residual stress, and cracking in solid-state AFSD builds',
      'Quantified AFSD large build envelope and low equipment complexity (no vacuum chamber)',
      'Proposed future directions: parameter optimization for defect elimination, integrated CAM software, and metal-matrix composite applications',
    ],
    images: [
      {
        src: '/images/projects/additive-friction-stir-deposition/additive friction stir deposition.png',
        alt: 'AFSD Process Schematic',
        caption: 'AFSD Process Schematic – Rotating tool depositing solid-state feed material',
      },
      {
        src: '/images/projects/additive-friction-stir-deposition/Grain Microscopy.png',
        alt: 'Grain Microstructure Comparison',
        caption: 'Grain Microstructure Comparison – Refined grains after AFSD processing',
      },
      {
        src: '/images/projects/additive-friction-stir-deposition/Yield Strength Comparison.JPG',
        alt: 'Yield Strength Comparison',
        caption: 'Yield Strength Comparison – AFSD-processed materials show significant improvements: Inconel 625 (+49% vs base, 2× stronger than SLM) and Ti-6Al-4V (+20% vs base)',
      },
      {
        src: '/images/projects/additive-friction-stir-deposition/Tensile Strength Comparison.JPG',
        alt: 'Tensile Strength Comparison',
        caption: 'Tensile Strength Comparison – Comparative performance of AFSD vs SLM/EBM/base alloys across multiple material systems',
      },
    ],
  },
  {
    slug: 'two-stage-gearbox-shaft-design',
    title: 'Gearbox Design',
    shortDescription:
      'Designed and analyzed shafts A and B of a two-stage reduction gearbox, performing stress, fatigue, and deflection analysis validated with ANSYS simulation and SolidWorks modeling.',
    fullDescription:
      'Developed a two-stage spur gear reduction gearbox transmitting 10 kW at 1000 rpm for an escalator driveline. Designed shafts A and B through iterative stress, fatigue, and deflection analysis using the Goodman criterion, bearing life calculations, and ANSYS validation. Achieved safety factors above design targets with minimal deflection and verified manufacturability using standard SKF bearings and KHK gears.',
    designAndAnalysisMethodology: {
      designApproach: [
        'Defined gearbox power, torque, and life requirements (10 kW, 1000 rpm, 10-year duty).',
        'Modeled 1:2 gear ratio system with 92% reliability and light shock conditions.',
      ],
      componentSelection: [
        'Selected spur gears (SSG4-24E, SSG4-48E) from KHK catalog.',
        'Chose SKF 6303, 6403, 6204 ETN9, and N305 ECP bearings using dynamic load rating (C₁₀).',
        'Specified 1050 Steel Q&T 400 F for improved fatigue strength.',
      ],
      stressAndFatigueAnalysis: [
        'Applied combined bending and torsional loading with Goodman fatigue criterion.',
        'Incorporated stress concentration and notch sensitivity factors for fillets and keyways.',
      ],
      deflectionAndSlope: [
        'Estimated deflection using superposition and beam theory, verified by ANSYS simulation.',
        'Ensured <0.3 mm deflection under load to maintain gear alignment.',
      ],
      simulationAndValidation: [
        'Performed mesh convergence analysis (<3% error) in ANSYS.',
        'Validated analytical safety factors: Shaft A = 1.86, Shaft B = 3.1.',
      ],
    },
    keyAchievements: [
      'Achieved safety factors exceeding design targets (A: 1.86, B: 3.1).',
      'Reduced shaft deflection to <0.3 mm under operating torque.',
      'Validated analytical results via ANSYS with ±10% agreement.',
      'Optimized design for manufacturability using standard components.',
    ],
    results: {
      otherMetrics: [
        { label: 'Input Power', value: '10 kW' },
        { label: 'Speed', value: '1000 rpm' },
        { label: 'Safety Factor (Shaft A)', value: '1.86' },
        { label: 'Safety Factor (Shaft B)', value: '3.10' },
        { label: 'Max Deflection', value: '0.3 mm' },
        { label: 'Material', value: 'AISI 1050 Q&T 400F' },
      ],
    },
    technologies: [
      'SolidWorks CAD',
      'ANSYS FEA',
      'Shaft Design',
      'Fatigue Analysis',
      'Bearing Selection',
      'Goodman Criterion',
      'Beam Deflection Analysis',
    ],
    course: 'MIE442 - Machine Design',
    institution: 'University of Toronto',
    year: 'Fall 2022',
    image: '/images/projects/two-stage-gearbox/gearbox-background.png',
    objective:
      'Design shafts A and B of a two-stage reduction gearbox for an escalator driveline, including force analysis, material selection, stress and fatigue analysis, deflection analysis, bearing selection, and validation using ANSYS FEA.',
    images: [
      {
        src: '/images/projects/two-stage-gearbox/gearbox-fea-shaft.png',
        alt: 'Gearbox FEA Shaft Analysis',
        caption: 'ANSYS FEA stress analysis of shaft showing von Mises stress distribution',
      },
      {
        src: '/images/projects/two-stage-gearbox/gearbox-fea-gear.png',
        alt: 'Gearbox FEA Gear Analysis',
        caption: 'ANSYS FEA analysis of gear contact and stress distribution',
      },
    ],
    videos: [
      {
        src: '/videos/projects/two-stage-gearbox/gearbox-demonstration.mp4',
        title: 'Gearbox Demonstration',
        description: 'Demonstration of the two-stage gearbox assembly and operation',
        type: 'operation',
      },
    ],
  },
  {
    slug: 'mie320-tensile-test',
    title: 'Acrylic Tensile Test',
    shortDescription:
      'Designed and optimized an acrylic tensile specimen to maximize strength-to-weight ratio under a two-point tensile test. The part was modeled, simulated, and iteratively improved using ANSYS, then fabricated and tested experimentally to validate simulation accuracy.',
    fullDescription:
      'Designed and optimized an acrylic tensile specimen to maximize strength-to-weight ratio under a two-point tensile test. The part was modeled in SolidWorks, simulated using ANSYS FEA with iterative design improvements, then fabricated and tested experimentally to validate simulation accuracy. Achieved accurate failure prediction in both location and mode, demonstrating the effectiveness of simulation-driven optimization.',
    technologies: [
      'ANSYS',
      'SolidWorks',
      'MATLAB',
      'Finite Element Analysis',
      'Structural Simulation',
      'Material Testing',
      'Optimization',
    ],
    image: '/images/projects/mie320-tensile-test/project-background.png',
    course: 'MIE320 - Finite Element Analysis',
    institution: 'University of Toronto',
    year: 'Spring 2021',
    objective:
      'Design and optimize an acrylic tensile specimen to maximize strength-to-weight ratio under a two-point tensile test, using FEA simulation to guide iterative design improvements and validate results through experimental testing.',
    designAndAnalysisMethodology: {
      designApproach: [
        'Modeled acrylic plate (PMMA) geometry in SolidWorks following test fixture constraints.',
        'Conducted 3D static structural analyses in ANSYS, applying bearing loads at the upper pin and fixed support at the lower pin.',
        'Employed 3 mm mesh size, growth rate of 1.2, and 3rd-degree refinement around pinholes and slot edges for convergence.',
        'Assumed PMMA tensile strength of 70 MPa and compressive yield of 124 MPa for failure prediction.',
      ],
      componentSelection: [
        'Tested multiple concepts:',
        'Defense holes to diffuse stress (ineffective — reduced strength-to-weight).',
        'Enlarged slot geometry to minimize mass (optimal slot width ≈ 5.6 in).',
        'Perimeter shaping and filleting to reduce low-stress material regions.',
        'Combined successful features into a hybrid final design achieving high stiffness with reduced weight.',
        'Predicted failure load: 2125 N; Predicted strength-to-weight ratio: 74.3 N/g.',
      ],
      stressAndFatigueAnalysis: [
        'Acrylic part fabricated and tested to failure under tensile load.',
        'Observed fracture at upper pinhole, matching FEA-predicted failure location.',
        'Actual failure load: 1381 N; Measured SW ratio: 48.8 N/g.',
        'Discrepancy attributed to material property variance, meshing limits, and fixture boundary simplifications.',
      ],
      simulationAndValidation: [
        'Revised simulation to test boundary conditions and compressive strength ranges (83–170 MPa).',
        'Updated target safety factor (SF = 1.54) based on experimental results.',
        'Iterated geometry with elliptical perimeter cutout to distribute stress more uniformly.',
        'Final prediction: Failure at 1635 N, SW ratio = 63.6 N/g → 30% improvement over previous design.',
      ],
    },
    keyAchievements: [
      'Optimized geometry for maximum strength-to-weight using FEA feedback loops',
      'Achieved accurate failure prediction in both location and mode (brittle fracture at pinhole)',
      'Integrated simulation–fabrication–testing validation cycle',
      'Elliptical geometry yielded best structural performance among tested designs',
      'Final design achieved 30% improvement in strength-to-weight ratio over initial design',
    ],
    results: {
      otherMetrics: [
        { label: 'Initial Simulation', value: 'Failure Load: 2125 N, SW Ratio: 74.3 N/g' },
        { label: 'Experimental Results', value: 'Failure Load: 1381 N, SW Ratio: 48.8 N/g' },
        { label: 'Improved Design', value: 'Failure Load: 1635 N, SW Ratio: 63.6 N/g' },
        { label: 'Safety Factor', value: '1.54' },
      ],
    },
    images: [
      {
        src: '/images/projects/mie320-tensile-test/fea-result.png',
        alt: 'FEA Result',
        caption: 'ANSYS FEA stress analysis showing von Mises stress distribution and failure prediction',
      },
      {
        src: '/images/projects/mie320-tensile-test/actual-sample.jpg',
        alt: 'Actual Sample',
        caption: 'Fabricated acrylic tensile specimen after experimental testing',
      },
    ],
    videos: [
      {
        src: '/videos/projects/mie320-tensile-test/testing-video.mp4',
        title: 'Tensile Testing Video',
        description: 'Experimental testing of the acrylic tensile specimen to failure',
        type: 'operation',
      },
    ],
  },
  {
    slug: 'dog-breed-classification-cnn',
    title: 'Dog Breed Classification with CNN',
    shortDescription:
      'Developed and trained multiple CNN architectures for dog breed classification using PyTorch. Implemented comprehensive data augmentation, batch normalization, and regularization techniques, comparing baseline and deeper models on the Stanford Dogs dataset.',
    fullDescription: `Developed and trained convolutional neural network (CNN) architectures for dog breed classification using PyTorch. Implemented a 3-layer baseline CNN and a 6-layer final model with comprehensive data augmentation, batch normalization, and regularization techniques. Through iterative refinement and hyperparameter optimization, achieved best training accuracy of 66.75%, validation accuracy of 56.10%, and test accuracy of 52.91% on 40 classes from the Stanford Dogs dataset after 330 epochs of training.`,
    technologies: [
      'Python',
      'PyTorch',
      'CNN',
      'Deep Learning',
      'Image Classification',
      'Batch Normalization',
      'Data Augmentation',
    ],
    githubUrl: 'https://github.com/NayrChiang/dog-breed-classification-cnn',
    image: '/images/projects/dog-breed-classification/project_background.png',
    course: 'APS360 - Applied Machine Learning',
    institution: 'University of Toronto',
    year: 'Spring 2023',
    objective:
      'Develop and train convolutional neural network models to classify dog breeds from images, comparing different architectures and optimization techniques.',
    dataset: {
      name: 'Stanford Dogs Dataset (SDS)',
      description:
        'Public dataset containing 120 classes with 20,580 varying-sized RGB images. The team limited the dataset to 40 classes based on the most popular dog breeds in 2022 AKC to improve real-world applicability. Each selected class contains 151-252 images, totaling 6,858 images.',
      configurations: [
        'Original dataset: 120 classes, 20,580 images',
        'Final configuration: 40 classes, 6,858 images (selected from most popular 2022 AKC breeds)',
        'Train/Validation/Test split: 5,488 / 685 / 685 images',
        'Class distribution: 151-252 images per class',
      ],
    },
    architectures: [
      {
        name: '3-Layer Baseline CNN',
        description:
          'Baseline 3-layer CNN with batch normalization and dropout',
        details: [
          '3 convolutional layers (3→15→30→60 channels) with batch normalization',
          'Fully connected layers: 168540→2809→40',
          'Trained with batch size 128, learning rate 0.001',
        ],
      },
      {
        name: '6-Layer CNN (Final Model)',
        description:
          'Primary model with 8 total layers: 6 convolutional layers and 2 fully connected layers, trained for 330 epochs',
        details: [
          '6 convolutional layers with increasing channels (3→30→30→60→60→120→120)',
          'Each layer: conv → batchNorm → ReLU → maxPool',
          'Fully connected: 120→80→40 with dropout',
        ],
      },
    ],
    technicalImplementation: {
      dataPreprocessing: [
        'Resize images to standardize input dimensions',
        'Random crop to 224x224 for training data',
        'Dataset normalization',
        'Train/validation/test split: 80/10/10',
        'Class selection: 40 classes of the most popular breeds',
      ],
      dataAugmentation: [
        'Random horizontal flip with probability of 0.3',
        'Random rotation by 30 degrees',
        'Random removal of a small section',
        'Applied during training to improve model generalization and reduce overfitting',
      ],
      trainingDetails: [
        'PyTorch framework',
        'Cross Entropy loss function',
        'Adam optimizer',
        'Learning rate: 0.001',
        'Weight decay: 0.003',
        'Batch size: 100',
        'Trained for 330 epochs',
      ],
      modelEvaluation: [
        'Implemented accuracy calculation functions',
        'Tracked training and validation accuracy over epochs',
        'Model checkpointing and saving',
        'Test set evaluation',
      ],
    },
    keyAchievements: [
      'Successfully implemented and compared multiple CNN architectures',
      'Applied advanced techniques: batch normalization, dropout, weight decay',
      'Optimized hyperparameters (learning rate, batch size, weight decay)',
      'Achieved significant improvement through iterative model refinement',
      'Final model trained for 330 epochs with comprehensive evaluation',
    ],
    results: {
      baselineAccuracy: '~10-12%',
      validationAccuracy: '56.10%',
      testAccuracy: '52.91%',
      epochs: 330,
      otherMetrics: [
        { label: 'Best Training Accuracy', value: '66.75%' },
        { label: 'Average Test Accuracy', value: '49.42%' },
      ],
    },
    images: [
      {
        src: '/images/projects/dog-breed-classification/example-of-processed-images.png',
        alt: 'Example of processed images',
        caption: 'Example of processed images',
      },
      {
        src: '/images/projects/dog-breed-classification/example-of-new-images.png',
        alt: 'Example of new iamges',
        caption: 'Example of new images',
      },
      {
        src: '/images/projects/dog-breed-classification/final-model-results-at-330-epochs.png',
        alt: 'Final Model Results at 330 Epochs',
        caption: 'Final model results after 330 epochs',
      },
    ],
  },
  {
    slug: 'whac-a-mole-embedded-game',
    title: 'Whac-A-Mole',
    shortDescription:
      'Built a desktop Whac-A-Mole arcade system using an Arduino Mega microcontroller. Integrated LED/button arrays, LCD feedback, and audio cues through efficient use of digital I/O, ADC, and timing interrupts. Demonstrated responsive gameplay within real-time embedded system constraints.',
    fullDescription:
      'Developed a microcontroller-based Whac-A-Mole game that replicates arcade-style reaction gameplay through embedded hardware and software integration. The system uses an Arduino Mega to control 12 LEDs, 12 push buttons, an LCD screen, and a speaker, with logic implemented via C++ firmware and interrupt-based timing. Optimized hardware pin usage with an analog voltage divider for button input and implemented a state-machine architecture for game flow, ensuring smooth user interaction and low-latency response.',
    technologies: [
      'Embedded Systems',
      'Arduino Programming',
      'Digital & Analog I/O',
      'ADC Conversion',
      'Interrupt Handling',
      'State Machine Architecture',
      'Real-Time Control',
      'Circuit Prototyping',
      'System Debugging',
      'C++',
    ],
    course: 'MIE438 - Microcontrollers and Embedded Microprocessors',
    institution: 'University of Toronto',
    year: 'Spring 2023',
    image: '/images/projects/whac-a-mole-embedded-game/project-background.png',
    objective:
      'Develop a complete embedded game system using Arduino Mega that demonstrates real-time control, I/O management, ADC conversion, and interrupt-driven programming within embedded system constraints.',
    designAndAnalysisMethodology: {
      designApproach: [
        'Integrated 12-input/12-output layout with analog multiplexing for pin efficiency using voltage divider circuit',
        'Used 16×2 LCD for score/time display and 8 Ω speaker for audio feedback',
        'Breadboarded full circuit with power and noise management via resistor tuning',
      ],
      componentSelection: [
        'Arduino Mega: 54 digital pins, 16 MHz clock speed, sufficient for 20 digital pins and 1 analog pin required',
        '12 push buttons with voltage divider circuit for analog multiplexing',
        '12 LEDs with 5.1kΩ resistors for power dissipation and lifespan',
        '16×2 LCD display for score and time information',
        '8 Ω 0.5W speaker for audio feedback (direct connection, no series resistor)',
      ],
      stressAndFatigueAnalysis: [
        'Developed firmware in C++ using Arduino IDE',
        'Implemented finite state machine for idle, game loop, and scoring states',
        'Used millis() interrupt timer for LED activation and score timing',
        'Employed digital/analog I/O, ADC conversion, interrupt timing, and serial monitoring',
      ],
      simulationAndValidation: [
        'Calibrated analog thresholds for reliable button detection',
        'Addressed voltage noise with buffer resistors and refined logic flow',
        'Optimized with loop unrolling and global variables to minimize latency',
      ],
    },
    keyAchievements: [
      'Developed a complete embedded game using only Arduino Mega on-board capabilities',
      'Achieved smooth, real-time user interaction with <200 ms latency',
      'Optimized input handling and control logic for responsiveness and resource efficiency',
      'Applied course concepts in I/O management, ADC, and interrupt-driven control',
      'Implemented state machine architecture for robust game flow management',
      'Successfully integrated multiple peripherals (LEDs, buttons, LCD, speaker) with efficient pin usage',
    ],
    results: {
      otherMetrics: [
        { label: 'Game Loop (No Input)', value: '~10 ms' },
        { label: 'Game Loop (With Input)', value: '~173 ms average' },
        { label: 'Response Latency', value: '<200 ms' },
      ],
    },
    images: [
      {
        src: '/images/projects/whac-a-mole-embedded-game/project-background.png',
        alt: 'Whac-A-Mole Embedded System',
        caption: 'Complete Whac-A-Mole embedded system with LED/button array, LCD display, and speaker',
      },
    ],
    videos: [
      {
        src: '/videos/projects/whac-a-mole-embedded-game/project-presentation.mp4',
        title: 'Whac-A-Mole Project Presentation',
        description: 'Complete demonstration of the Whac-A-Mole embedded system game showing gameplay, scoring, and system operation',
        type: 'operation',
      },
    ],
  },
  {
    slug: 'home-cnc-milling-machine',
    title: 'CNC Milling Machine',
    shortDescription:
      'Designed a complete CNC milling machine for home use. Created full CAD models, engineering drawings, and technical specifications using SolidWorks, following systematic engineering design process.',
    fullDescription: `A conceptual design project for a home CNC milling machine targeting beginners and hobbyists. Followed systematic engineering design process from problem definition to candidate evaluation, resulting in complete CAD models, detailed engineering drawings, and technical documentation ready for detailed design phase.`,
    technologies: [
      'SolidWorks',
      'CAD/CAM',
      'Mechanical Design',
      'Engineering Drawing',
      'Mechanism Design',
      'Gear Design',
      'Motion Analysis',
      'Assembly Design',
    ],
    image: '/images/projects/home-cnc-milling-machine/project_background.png',
    course: 'MIE243 - Mechanical Engineering Design I',
    institution: 'University of Toronto',
    year: 'Fall 2019',
    objective:
      'Develop an advanced conceptual design for a complete CNC Milling Machine for home or small office use, creating a design ready to continue into the detailed design process. Focus on accessibility, ease of use, and reasonable cost for beginners and hobbyists.',
    technicalImplementation: {
      trainingDetails: [
        'Engineering Design Process: Problem definition, engineering specifications (functions, objectives, constraints), candidate design generation and evaluation',
        'Mechanism Selection: Identified and classified mechanical components (linkages, gears, bearings, actuators, motion transmission systems)',
        'CAD Modeling: Complete 3D assembly model in SolidWorks including all major components (rails, lead screws, spindle mount, work table, base, motor assemblies)',
        'Engineering Drawings: Detailed 2D technical drawings with proper views, dimensioning, and tolerancing for all components',
        'Motion Analysis: Analyzed motion transmission from stepper motors through lead screws to linear motion of spindle and work table',
        'Component Design: Designed custom components including rail supports, spindle mounts, motor platforms, and flexible shaft couplings',
        'Assembly Design: Created exploded views and assembly documentation showing component relationships and assembly sequence',
        'Material Selection: Considered material properties, manufacturing processes, and cost constraints for component selection',
      ],
    },
    keyAchievements: [
      'Successfully applied systematic engineering design process from problem definition to candidate evaluation',
      'Created complete 3D CAD assembly model with 25+ individual components in SolidWorks',
      'Generated comprehensive engineering drawings for all major components with proper technical documentation',
      'Designed motion transmission system using lead screws, linear bearings, and stepper motors for precise positioning',
      'Integrated multiple mechanical systems: linear motion (X/Y/Z axes), spindle mounting, work table support, and motor assemblies',
      'Applied mechanism classification and toolbox approach to identify appropriate components for each function',
      'Demonstrated understanding of mechanical design principles: force analysis, motion constraints, assembly considerations',
      'Created design ready for detailed design phase with complete technical documentation',
    ],
    results: {
      otherMetrics: [
        { label: 'Project Type', value: 'Conceptual Design (25% of course grade)' },
        { label: 'Group Size', value: '4-6 team members' },
        { label: 'CAD Components', value: '25+ individual parts' },
        { label: 'Engineering Drawings', value: 'Complete set with exploded views' },
        { label: 'Design Readiness', value: 'Ready for detailed design phase' },
        { label: 'Target Market', value: 'Beginners and hobbyists' },
        { label: 'Design Focus', value: 'Accessibility, ease of use, reasonable cost' },
      ],
    },
    cadModels: [
      {
        src: '/images/projects/home-cnc-milling-machine/cad-models/cnc-milling-machine-assembly.png',
        alt: 'CNC Milling Machine Assembly',
        caption: 'Complete 3D CAD assembly model of the home CNC milling machine showing all major components',
      },
    ],
    images: [
      {
        src: '/images/projects/home-cnc-milling-machine/engineering-drawings/machine.jpg',
        alt: 'CNC Milling Machine - 2D Engineering Drawing',
        caption: 'Complete 2D engineering drawing of the CNC milling machine',
      },
      {
        src: '/images/projects/home-cnc-milling-machine/engineering-drawings/exploded.jpg',
        alt: 'CNC Milling Machine Exploded View',
        caption: 'Exploded view showing all components and assembly relationships',
      },
      {
        src: '/images/projects/home-cnc-milling-machine/engineering-drawings/lead-screw-exploded.jpg',
        alt: 'Lead Screw Assembly Exploded View',
        caption: 'Exploded view of the lead screw assembly for spindle motor',
      },
      {
        src: '/images/projects/home-cnc-milling-machine/engineering-drawings/bushing.jpg',
        alt: 'Rail Slide Bushing - Engineering Drawing',
        caption: 'Engineering drawing of the rail slide bushing component',
      },
    ],
  },
  // Add more projects here as needed
]


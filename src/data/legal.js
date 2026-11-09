// Curated starting points. Laws and their territorial application require official verification.
export const legalFrameworks = {
  environment: {
    africa: [
      ['Revised African Convention on the Conservation of Nature and Natural Resources', 'https://au.int/en/treaties/african-convention-conservation-nature-and-natural-resources-revised-version', 'AU treaty: binding status depends on each state’s ratification and domestic legal arrangements'],
      ['UNEP Africa environmental law resources', 'https://www.unep.org/', 'Research and policy context, not a continent-wide statute']
    ],
    nigeria: [
      ['Climate Change Act 2021', 'https://climatechange.gov.ng/', 'Federal climate-governance framework; consult the enacted Act'],
      ['NESREA regulations', 'https://nesrea.gov.ng/', 'Federal environmental standards and enforcement, subject to applicable mandates']
    ]
  },
  impact: {
    africa: [['Bamako Convention', 'https://au.int/en/treaties/bamako-convention-ban-import-africa-and-control-transboundary-movement-and-management-hazardous', 'Hazardous-waste treaty; not a general municipal waste law']],
    nigeria: [['NESREA', 'https://nesrea.gov.ng/', 'Check applicable federal pollution and waste regulations'], ['Federal Ministry of Environment', 'https://environment.gov.ng/', 'Federal environmental policy and legislation resources']]
  },
  energy: {
    africa: [['African Union energy initiatives', 'https://au.int/en/energy', 'Continental policy initiatives, not a single enforceable electricity tariff']],
    nigeria: [['Electricity Act 2023', 'https://nerc.gov.ng/', 'Federal electricity legislation and regulatory context; state electricity markets may have separate rules'], ['NERC tariff orders', 'https://nerc.gov.ng/', 'Check distribution company, customer band and order effective date']]
  },
  traffic: {
    africa: [['African Road Safety Charter', 'https://au.int/en/treaties/african-road-safety-charter', 'Treaty framework; verify ratification and implementation']],
    nigeria: [['Federal Road Safety Corps', 'https://frsc.gov.ng/', 'National road-safety rules and official guidance'], ['Federal Ministry of Transportation', 'https://transportation.gov.ng/', 'National transport policy and related instruments']]
  },
  geography: {
    africa: [['African Union statistics', 'https://au.int/en/statistics', 'Continental statistical coordination and definitions']],
    nigeria: [['National Bureau of Statistics', 'https://nigerianstat.gov.ng/', 'Official statistical boundaries and state-level data'], ['Nigeria Data Protection Commission', 'https://ndpc.gov.ng/', 'Nigeria Data Protection Act 2023 and guidance where personal information is processed']]
  }
};
export const stateAuthorities = {
  Lagos: [['Lagos State Environmental Protection Agency', 'https://lasepa.gov.ng/', 'Environmental regulation and official notices'], ['Lagos State Waste Management Authority', 'https://lawma.gov.ng/', 'Municipal waste-management guidance']],
  Ogun: [['Ogun State Government', 'https://ogunstate.gov.ng/', 'Check current state legislation and competent agencies']],
  Kano: [['Kano State Government', 'https://kanostate.gov.ng/', 'Check current state legislation and competent agencies']],
  Rivers: [['Rivers State Government', 'https://www.riversstate.gov.ng/', 'Check current state legislation and competent agencies']]
};
export const otherCountries = {
  Ghana: [['Ghana Environmental Protection Authority', 'https://epa.gov.gh/', 'Environmental law and regulatory notices'], ['Ghana Energy Commission', 'https://www.energycom.gov.gh/', 'Energy regulation and licensing']],
  Kenya: [['Kenya Law', 'https://new.kenyalaw.org/', 'Official legislation and legal decisions'], ['National Environment Management Authority', 'https://www.nema.go.ke/', 'Environmental regulations']],
  'South Africa': [['South African Government', 'https://www.gov.za/documents/acts', 'National acts and regulations'], ['Department of Forestry, Fisheries and the Environment', 'https://www.dffe.gov.za/', 'Environmental rules and policy']]
};
export const sections = { '/':'geography', '/energy':'energy', '/traffic':'traffic', '/environment':'environment', '/impact':'impact', '/sources':'geography', '/about':'geography' };

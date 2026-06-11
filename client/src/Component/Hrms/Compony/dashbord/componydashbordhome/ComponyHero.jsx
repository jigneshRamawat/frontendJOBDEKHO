import { 
  Building2, 
  UserPlus, 
  Globe, 
  CheckSquare, 
  Sliders, 
  MessageSquareShare, 
  PlusCircle, 
  TrendingUp, 
  ShieldAlert 
} from 'lucide-react';

function ComponyHero() {
  const coreFeatures = [
    { id: 1, title: 'Master Overview', icon: <Building2 className="w-8 h-8 text-blue-600" />, link: '#' },
    { id: 2, title: 'Create HR', icon: <UserPlus className="w-8 h-8 text-indigo-600" />, link: '/creteHr' },
    { id: 3, title: 'Add HR', icon: <Globe className="w-8 h-8 text-teal-600" />, link: '#' },
    { id: 4, title: 'Leave Approvals', icon: <CheckSquare className="w-8 h-8 text-green-600" />, link: '#' },
    { id: 5, title: 'HR Details', icon: <Sliders className="w-8 h-8 text-gray-600" />, link: '#' },
    { id: 6, title: 'Feedback', icon: <MessageSquareShare className="w-8 h-8 text-orange-600" />, link: '#' },
  ];

  const addedFeatures = [
    { id: 7, title: 'Post New Job', icon: <PlusCircle className="w-8 h-8 text-purple-600" />, link: '#', tag: 'New' },
    { id: 8, title: 'Analytics & Reports', icon: <TrendingUp className="w-8 h-8 text-emerald-600" />, link: '#', tag: 'Metrics' },
    { id: 9, title: 'Access Control', icon: <ShieldAlert className="w-8 h-8 text-rose-600" />, link: '#', tag: 'Security' },
  ];

  return (
    <div className="min-h-screen bg-[#FDF3E7] font-sans antialiased text-slate-800">
      <header className="max-w-7xl mx-auto px-6 pt-8 pb-4 flex justify-between items-center border-b border-orange-100">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          JobDekhoo <span className="text-sm font-medium text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full ml-2 border border-orange-200">Dashboard</span>
        </h1>
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-lg font-semibold tracking-wide text-slate-700 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-xl shadow-sm border border-orange-100">
            Admin
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Core Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((item) => (
              <a 
                key={item.id} 
                href={item.link} 
                className="group flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(234,179,8,0.07)] border border-orange-50/50 hover:border-orange-200 hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-orange-50 transition-colors duration-300 mb-5">
                  {item.icon}
                </div>
                <span className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors duration-300 underline decoration-transparent group-hover:decoration-orange-400 decoration-2 underline-offset-4">
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        <hr className="border-orange-100 my-10" />

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Advanced Controls</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addedFeatures.map((item) => (
              <a 
                key={item.id} 
                href={item.link} 
                className="group flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-dashed border-orange-200/60 hover:border-solid hover:border-orange-300 hover:bg-white hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 text-center relative overflow-hidden"
              >
                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded-md">
                  {item.tag}
                </span>
                <div className="p-4 bg-slate-50/50 rounded-2xl group-hover:bg-orange-50 transition-colors duration-300 mb-5">
                  {item.icon}
                </div>
                <span className="text-lg font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-300">
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

export default ComponyHero;
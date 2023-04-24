/*
using System.Data.Linq.Mapping;
using System.Xml.Linq;

namespace MdbReader
{
    /// <summary>
    /// 监控数据
    /// </summary>
    public class MONITOR_DATA
    {
        /// <summary>
        /// 设备ID
        /// </summary>
        [Column(Name = "DEV_NUM")]
        public string DeviceId { get; set; }
        /// <summary>
        /// 设备类型
        /// </summary>
        [Column(Name = "DEV_TYPE")]
        public string DeviceType { get; set; }
    }
}

*/
export interface IDevice {
    DeviceId: string;
    DeviceType: string;
}
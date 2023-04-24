/*
using System;
using System.Collections.Generic;
using System.Data.Linq.Mapping;

namespace MdbReader
{
    /// <summary>
    /// 速度详细数据
    /// </summary>
    public class SDW_DATA
    {
        /// <summary>
        /// 时间
        /// </summary>
        [Column(Name = "TIME")]
        public DateTime SaveTime { get; set; }
        /// <summary>
        /// 时间
        /// </summary>
        [Column(Name = "lTIME")]
        public int Time { get; set; }
        /// <summary>
        /// 毫秒
        /// </summary>
        [Column(Name = "MSECOND")]
        public short Millisecond { get; set; }
        /// <summary>
        /// 车次ID
        /// </summary>
        [Column(Name = "TRAINID")]
        public int PlanId { get; set; }
        /// <summary>
        /// 数据长度
        /// </summary>
        [Column(Name = "LENGTH")]
        public short DataLength { get; set; }
        /// <summary>
        /// 设备号
        /// </summary>
        [Column(Name = "DEVNUM")]
        public short DeviceId { get; set; }
        /// <summary>
        /// 勾车ID
        /// </summary>
        [Column(Name = "GCID")]
        public byte CutId { get; set; }
        /// <summary>
        /// 勾车车次号
        /// </summary>
        [Column(Name = "GLFCCH")]
        public string TrainName { get; set; }
        /// <summary>
        /// 速度数据
        /// </summary>
        [Column(Name = "SPEED")]
        public List<SDW_SPEED> SpeedList { get; set; }
    }
    /// <summary>
    /// 速度数据
    /// </summary>
    public class SDW_SPEED
    {
        /// <summary>
        /// 速度
        /// </summary>
        [Column(Name = "RTDSD")]
        public float Speed { get; set; }
        /// <summary>
        /// 减速器状态
        /// </summary>
        [Column(Name = "RTDSTATUS")]
        public byte Status { get; set; }
        /// <summary>
        /// 计轴数
        /// </summary>
        [Column(Name = "RTDZS")]
        public byte Axis { get; set; }
    }
}
*/
export interface ISpeedData {
    SaveTime: Date;
    Time: number;
    Millisecond: number;
    PlanId: number;
    DataLength: number;
    DeviceId: number;
    CutId: number;
    TrainName: string;
    SpeedList: ISpeed[];
}
export interface ISpeed {
    Speed: number;
    Status: number;
    Axis: number;
}

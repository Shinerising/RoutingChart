/*
using System.Collections.Generic;
using System;
using System.Data.Linq.Mapping;

namespace MdbReader
{
    /// <summary>
    /// 计划数据
    /// </summary>
    public class GCW_PLAN
    {
        /// <summary>
        /// 车次ID
        /// </summary>
        [Column(Name = "TRAINID")]
        public int PlanId { get; set; }
        /// <summary>
        /// 勾车车次号
        /// </summary>
        [Column(Name = "TRAIN_NAME")]
        public string TrainName { get; set; }
    }
    /// <summary>
    /// 勾车数据
    /// </summary>
    public class GCW_CUT : GCW_PLAN
    {
        /// <summary>
        /// 勾车序号
        /// </summary>
        [Column(Name = "GCID")]
        public byte CutId { get; set; }
        /// <summary>
        /// 勾车储存文件
        /// </summary>
        [Column(Name = "GXASC")]
        public string Brief { get; set; }
    }
    /// <summary>
    /// 勾车详细数据
    /// </summary>
    public class GCW_DATA : GCW_CUT
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
        /// 设备数据
        /// </summary>
        [Column(Name = "DEVICE")]
        public List<GCW_DEVICE> DeviceList { get; set; }
    }
    /// <summary>
    /// 设备数据
    /// </summary>
    public class GCW_DEVICE
    {
        /// <summary>
        /// 设备号
        /// </summary>
        [Column(Name = "GCSSB")]
        public short DeviceId { get; set; }
        /// <summary>
        /// 入口速度
        /// </summary>
        [Column(Name = "GCENTV")]
        public float EnterSpeed { get; set; }
        /// <summary>
        /// 进入时间
        /// </summary>
        [Column(Name = "GCINTIME")]
        public int EnterTime { get; set; }
        /// <summary>
        /// 出口速度
        /// </summary>
        [Column(Name = "GCOUTV")]
        public float ExitSpeed { get; set; }
        /// <summary>
        /// 出清时间
        /// </summary>
        [Column(Name = "GCOUTTIME")]
        public int ExitTime { get; set; }
        /// <summary>
        /// 勾车出错标志
        /// </summary>
        [Column(Name = "GCSX")]
        public short Flag { get; set; }
        /// <summary>
        /// 开始控轴数
        /// </summary>
        [Column(Name = "STRJZ")]
        public byte Axis { get; set; }
    }
}


*/

export interface IPlan {
    PlanId: number;
    TrainName: string;
}
export interface ICut extends IPlan {
    CutId: number;
    Brief: string;
}
export interface IData extends ICut {
    SaveTime: Date;
    Time: number;
    Millisecond: number;
    DeviceList: IDevice[];
}
export interface IDevice {
    DeviceId: number;
    EnterSpeed: number;
    EnterTime: number;
    ExitSpeed: number;
    ExitTime: number;
    Flag: number;
    Axis: number;
}